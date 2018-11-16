import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import ThemeModel from '../models/theme.model';
import CardModel from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getThemes(): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(this.baseUrl + 'themes');
  }

  postTheme(name: string): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(this.baseUrl + 'theme', {name: name});
  }

  deleteTheme(id: string): Observable<ThemeModel> {
    return this.http.delete<ThemeModel>(this.baseUrl + 'theme_delete/' + id);
  }

  getCards(themeName: string): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(this.baseUrl + 'cards/' + themeName);
  }

  postCard(card: CardModel): Observable<CardModel> {
    return this.http.post<CardModel>(this.baseUrl + 'card', {card: card});
  }

  putCard(card: CardModel): Observable<CardModel> {
    return this.http.put<CardModel>(this.baseUrl + 'card', {card: card});
  }
}
