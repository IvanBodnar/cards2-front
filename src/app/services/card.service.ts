import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

import {DataService} from './data.service';
import CardModel from '../models/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService implements Resolve<CardModel[]> {
  private _cardsSubject = new BehaviorSubject<CardModel[]>(null);
  cards$ = this._cardsSubject.asObservable();

  constructor(
    private dataservice: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CardModel[]> {
    const themeName = route.params.themeName;
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

  addCard(themeName: string) {
    this.fetchCards(themeName);
  }
}
