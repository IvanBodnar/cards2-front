import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import MessageModel from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSubject: Subject<MessageModel> = new Subject<MessageModel>();
  message$ = this.messageSubject.asObservable();

  constructor() { }

  sendMessage(message: MessageModel): void {
    this.messageSubject.next(message);
  }
}
