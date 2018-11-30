import {Component, OnInit} from '@angular/core';

import {MessageService} from '../../services/message.service';
import MessageModel, {MessageType} from '../../models/message.model';


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
          if (message.type === MessageType.warning) {
            this._showMessage(message);
          } else {
            this._showMessage(message);
            this._hideMessage(1500);
          }
        }
      );
  }

  private _showMessage(message: MessageModel): void {
    this.message = message;
    setTimeout(() => {
      this.opacity = { 'opacity': 0.9 };
    }, 100);
  }

  private _hideMessage(ms: number = 0): void {
    setTimeout(() => this.opacity = { 'opacity': 0 }, ms);
  }

  onConfirmation(value: boolean) {
    this.messageService.confirmMessageSubject.next(value);
    this._hideMessage();
  }

}
