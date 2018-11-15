import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  themeName: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route);
    this.themeName = this.route.snapshot.params.themeName;
  }

}
