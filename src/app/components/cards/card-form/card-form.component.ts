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
  editingId: string;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cardForm = new FormGroup({
      'front': new FormControl(null, [Validators.required]),
      'back': new FormControl(null, [Validators.required])
    });
    this.cardService.cardToEdit$
      .subscribe(
        (card: CardModel) => {
          this.editingId = card._id;
          this.cardForm.get('front').setValue(card.front);
          this.cardForm.get('back').setValue(card.back);
          this.state = State.edit;
        }
      );
  }

  onSubmit() {
    const id = State.edit ? this.editingId : null;
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
