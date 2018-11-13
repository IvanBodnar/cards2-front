import { Component, OnInit } from '@angular/core';

import {DataService} from '../../../services/data.service';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getThemes()
      .subscribe(
        themes => console.log(themes),
        error => console.log(error)
      );
  }

}
