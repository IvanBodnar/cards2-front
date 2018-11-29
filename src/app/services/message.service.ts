import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import MessageModel, {MessageType} from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageSubject: Subject<MessageModel> = new Subject<MessageModel>();
  message$ = this.messageSubject.asObservable();

  constructor() { }

  sendMessage(messageType: MessageType, messageText: string): void {
    let title: string;
    switch (messageType) {
      case MessageType.positive:
        title = 'Operación Exitosa';
        break;
      case MessageType.negative:
        title = 'Operación Fallida';
        break;
      case MessageType.info:
        title = 'Info';
        break;
      case MessageType.warning:
        title = 'Atención';
        break;
      default:
        title = 'Tipo de Mensaje Desconocido';
        break;
    }
    const message = new MessageModel(
      messageType,
      messageText,
      title
    );
    this.messageSubject.next(message);
  }
}
