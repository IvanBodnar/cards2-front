import { Component } from '@angular/core';

import {ThemeService} from './services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cards2-front';

  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.fetchThemes();
  }
}
