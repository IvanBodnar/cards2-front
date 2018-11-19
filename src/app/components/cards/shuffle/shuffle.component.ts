import { Component, OnInit } from '@angular/core';

import {CardService} from '../../../services/card.service';
import CardModel from '../../../models/card.model';
import {DataService} from '../../../services/data.service';


@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.css']
})
export class ShuffleComponent implements OnInit {
  active = false;
  cardsIt: any;
  cutIndex: number;
  currentCard: CardModel;

  constructor(
    private cardService: CardService,
    private  dataService: DataService
  ) { }

  ngOnInit() {
    this._subscribeToCards();
    this._nextCard();
  }

  _subscribeToCards() {
    this.cardService.cards$
      .subscribe(
        cards => {
          this.cardsIt = cards.entries();
          this.cutIndex = Math.floor(cards.length / 2);
          console.log('_subscribeToCards: ', this.cutIndex, cards);
        }
      );
  }

  _nextCard() {
    const nextCard = this.cardsIt.next();
    if (nextCard.value[0] === this.cutIndex) {
      this.cardService.fetchCards(this.cardService.themeName).subscribe(() => {});
      console.log('getCards');
    }
    this.currentCard = nextCard.value[1];
  }

  onNext() {
    this._nextCard();
  }

  add() {
    this.currentCard.score += 1;
    this.dataService.putCard(this.currentCard)
      .subscribe(
        () => {}
      );
  }

}
