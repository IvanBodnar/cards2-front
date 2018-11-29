import { Component, OnInit } from '@angular/core';

import {MessageService} from '../../services/message.service';
import MessageModel from '../../models/message.model';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: MessageModel;
  opacity = { 'opacity': 0 };

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.message$
      .subscribe(
        ( message: MessageModel ) => {
          this._showMessage(message);
        }
      );
  }

  private _showMessage(message: MessageModel): void {
    this.message = message;
    setTimeout(() => {
      this.opacity = { 'opacity': 0.9 };
      setTimeout(() => this.opacity = { 'opacity': 0 } , 3000);
    }, 100);
  }

}
