import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

import {DataService} from './data.service';
import ThemeModel from '../models/theme.model';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themesSubject = new BehaviorSubject<ThemeModel[]>(null);
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

  addTheme(name: string) {
    this.dataService.postTheme(name)
      .subscribe(
        () => this.fetchThemes()
      );
  }

  deleteTheme(id: string) {
    this.dataService.deleteTheme(id)
      .subscribe(
        () => this.fetchThemes()
      );
  }
}
