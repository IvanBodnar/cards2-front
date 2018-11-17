import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

import {DataService} from './data.service';
import CardModel from '../models/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService implements Resolve<CardModel[]> {
  themeName: string;
  private _cardsSubject = new BehaviorSubject<CardModel[]>(null);
  cards$ = this._cardsSubject.asObservable();
  editSubject = new Subject<CardModel>();
  cardToEdit$ = this.editSubject.asObservable();

  constructor(
    private dataservice: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CardModel[]> {
    const themeName = route.params.themeName;
    this.themeName = themeName;
    return this.fetchCards(themeName);
  }

  fetchCards(themeName: string): Observable<CardModel[]> {
    const cards = this.dataservice.getCards(themeName);
    cards
      .subscribe(
        (cardsArray: CardModel[]) => {
          this._cardsSubject.next(cardsArray);
        }
      );
    return cards;
  }

  addCard(card: CardModel) {
    this.dataservice.postCard(card)
      .subscribe(
        () => this.fetchCards(card.themeName)
      );
  }

  editCard(card: CardModel) {
    this.dataservice.putCard(card)
      .subscribe(
        () => this.fetchCards(card.themeName)
      );
  }

  removeCard(id: string) {
    this.dataservice.deleteCard(id)
      .subscribe(
        () => this.fetchCards(this.themeName)
      );
  }

}
