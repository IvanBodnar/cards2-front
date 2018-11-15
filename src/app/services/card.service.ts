import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {DataService} from './data.service';
import CardModel from '../models/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardService implements Resolve<CardModel[]> {

  constructor(
    private dataservice: DataService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<CardModel[]> {
    const themeName = route.params.themeName;
    return this.dataservice.getCards(themeName);
  }
}
