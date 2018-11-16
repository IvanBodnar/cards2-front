import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import FormModel from '../../../models/form.model';
import {State} from '../../../models/state.model';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardForm: FormGroup;
  state = State.add;
  @Output() formSubmitted: EventEmitter<FormModel> = new EventEmitter<FormModel>();

  constructor() { }

  ngOnInit() {
    this.cardForm = new FormGroup({
      'front': new FormControl(null, [Validators.required]),
      'back': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const formData: FormModel = new FormModel(
      this.cardForm.value.front,
      this.cardForm.value.back,
      this.state
    );
    this.formSubmitted.emit(formData);
    // console.log(this.cardForm);
  }

}
