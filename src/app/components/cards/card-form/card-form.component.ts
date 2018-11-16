import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {State} from '../../../models/state.model';
import {CardService} from '../../../services/card.service';
import CardModel from '../../../models/card.model';


@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit, OnChanges {
  cardForm: FormGroup;
  @Input() themeName: string;
  state = State.add;
  @Input() dataToEdit: CardModel;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cardForm = new FormGroup({
      'front': new FormControl(null, [Validators.required]),
      'back': new FormControl(null, [Validators.required])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const value = changes.dataToEdit.currentValue;
    if (value) {
      this.cardForm.get('front').setValue(value.front);
      this.cardForm.get('back').setValue(value.back);
      this.state = State.edit;
    }
  }

  onSubmit() {
    const card: CardModel = new CardModel(
      null, this.cardForm.value.front, this.cardForm.value.back, this.themeName
    );
    this.cardService.addCard(card);
  }



}
