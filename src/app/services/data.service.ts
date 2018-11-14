import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import ThemeModel from '../models/theme.model';

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
}
