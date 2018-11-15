import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import CardModel from '../../../models/card.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  themeName: string;
  cards: CardModel[];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.cards = this.route.snapshot.data.cards;
    this.themeName = this.route.snapshot.params.themeName;
  }

}
