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
    const value = changes.dataToEdit.currentValue;
    if (value) {
      this.cardForm.get('front').setValue(value.front);
      this.cardForm.get('back').setValue(value.back);
      this.state = State.edit;
    }
  }

  onSubmit() {
    const id = State.edit ? this.dataToEdit._id : null;
    const card: CardModel = new CardModel(
      id,
      this.cardForm.value.front,
      this.cardForm.value.back,
      this.themeName
    );
    if (this.state === State.edit) {
      this.cardService.editCard(card);
      this._clearFields();
    } else if (this.state === State.add) {
      this.cardService.addCard(card);
      this._clearFields();
    } else {
      throw new Error('State not set');
    }
  }

  _clearFields(): void {
    this.cardForm.get('front').setValue(null);
    this.cardForm.get('back').setValue(null);
  }

}
