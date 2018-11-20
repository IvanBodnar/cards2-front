import { Component, OnInit } from '@angular/core';

import {CardService} from '../../../services/card.service';
import CardModel from '../../../models/card.model';
import {DataService} from '../../../services/data.service';

declare let $: any;

@Component({
  selector: 'app-shuffle',
  templateUrl: './shuffle.component.html',
  styleUrls: ['./shuffle.component.css']
})
export class ShuffleComponent implements OnInit {
  scored = false;
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
    $('.segment')
      .dimmer({
        on: 'hover'
      });
  }

  _subscribeToCards() {
    this.cardService.cards$
      .subscribe(
        cards => {
          this.cardsIt = cards.entries();
          this.cutIndex = Math.floor(cards.length / 2);
        }
      );
  }

  _nextCard() {
    const nextCard = this.cardsIt.next();
    if (nextCard.value[0] === this.cutIndex) {
      this.cardService.fetchCards(this.cardService.themeName).subscribe(() => {});
    }
    this.currentCard = nextCard.value[1];
  }

  onNext() {
    const mobile = window.matchMedia('(max-width: 1025px)');
    if (mobile.matches) {
      setTimeout(
        () => {
          this._nextCard();
          this.scored = false;
        }, 1000
      );
    } else {
      this._nextCard();
      this.scored = false;
    }
  }

  onSuccess() {
    this.currentCard.score += 1;
    this.dataService.putCard(this.currentCard)
      .subscribe(
        () => {}
      );
    this.scored = true;
  }

  onError() {
    this.currentCard.score -= 1;
    this.dataService.putCard(this.currentCard)
      .subscribe(
        () => {}
      );
    this.scored = true;
  }

}
