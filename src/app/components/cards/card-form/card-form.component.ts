import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {State} from '../../../models/state.model';
import {CardService} from '../../../services/card.service';
import CardModel from '../../../models/card.model';


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardForm: FormGroup;
  @Input() themeName: string;
  state = State.add;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cardForm = new FormGroup({
      'front': new FormControl(null, [Validators.required]),
      'back': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const card: CardModel = new CardModel(
      null, this.cardForm.value.front, this.cardForm.value.back, this.themeName
    );
    this.cardService.addCard(card);
  }

}
