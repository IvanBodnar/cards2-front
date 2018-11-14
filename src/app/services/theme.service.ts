import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import {DataService} from './data.service';
import ThemeModel from '../models/theme.model';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themesSubject = new Subject<ThemeModel[]>();
  themes$ = this._themesSubject.asObservable();

  constructor(
    private dataService: DataService
  ) { }

  fetchThemes() {
    this.dataService.getThemes()
      .subscribe(
        (themes: ThemeModel[]) => {
          this._themesSubject.next(themes);
        },
        error => console.log(error)
      );
  }

  addTheme() {
    this.dataService.postTheme('ffff1')
      .subscribe(
        () => this.fetchThemes()
      );
  }
}
