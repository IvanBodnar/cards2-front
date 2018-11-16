import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import CardModel from '../../../models/card.model';
import {CardService} from '../../../services/card.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  themeName: string;
  cards: CardModel[];
  cardToEdit: CardModel;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cards = this.route.snapshot.data.cards;
    this.cardService.cards$
      .subscribe(
        (cards: CardModel[]) => {
          this.cards = cards;
        }
      );
    this.themeName = this.route.snapshot.params.themeName;
  }

  onEdit(card: CardModel) {
    this.cardToEdit = card;
  }
}
