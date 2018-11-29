import {Component, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import CardModel from '../../../models/card.model';
import {CardService} from '../../../services/card.service';
import {MessageService} from '../../../services/message.service';
import MessageModel, {MessageType} from '../../../models/message.model';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  themeName: string;
  cards: CardModel[];

  constructor(
    private cardService: CardService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
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
    const form = this.renderer.selectRootElement('form', true);
    this.cardService.editSubject.next(card);
    form.scrollIntoView({behavior: 'smooth'});
  }

  onDelete(id: string) {
    this.cardService.removeCard(id);
  }

}
