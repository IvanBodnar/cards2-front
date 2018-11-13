import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {DataService} from './data.service';
import ThemeModel from '../models/theme.model';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  themes: ThemeModel[];

  constructor(
    private dataService: DataService
  ) { }

  fetchThemes() {
    this.dataService.getThemes()
      .subscribe(
        (themes: ThemeModel[]) => {
          this.themes = themes;
        },
        error => console.log(error)
      );
  }
}
