import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent implements OnInit {
  cardForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.cardForm = new FormGroup({
      'front': new FormControl(null),
      'back': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.cardForm);
  }

}
