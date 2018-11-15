import { Component, OnInit } from '@angular/core';

import ThemeModel from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themesArray: ThemeModel[];
  addInput: string;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.themeService.themes$
      .subscribe(
        (themes: ThemeModel[]) => {
          this.themesArray = themes;
        },
        error => console.log(error)
      );
  }

  onAdd() {
    this.themeService.addTheme(this.addInput);
    this.addInput = undefined;
  }

  onDelete(id: string) {
    this.themeService.deleteTheme(id);
  }
}
