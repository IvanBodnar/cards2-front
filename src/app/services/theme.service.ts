import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {DataService} from './data.service';
import ThemeModel from '../models/theme.model';
import {MessageType} from '../models/message.model';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themesSubject = new BehaviorSubject<ThemeModel[]>(null);
  themes$ = this._themesSubject.asObservable();

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) { }

  fetchThemes() {
    this.dataService.getThemes()
      .subscribe(
        (themes: ThemeModel[]) => {
          this._themesSubject.next(themes);
        },
        error => console.log(error)
      );
  }

  addTheme(name: string) {
    this.dataService.postTheme(name)
      .subscribe(
        () => this.fetchThemes(),
        () => {
          this.messageService.sendMessage(
            MessageType.negative,
            'Tema no agregado'
          );
        },
        () => {
          this.messageService.sendMessage(
            MessageType.positive,
            'Tema agregado'
          );
        }
      );
  }

  deleteTheme(id: string) {
    this.dataService.deleteTheme(id)
      .subscribe(
        () => this.fetchThemes(),
        () => {
          this.messageService.sendMessage(
            MessageType.negative,
            'Tema no eliminado'
          );
        },
        () => {
          this.messageService.sendMessage(
            MessageType.positive,
            'Tema eliminado'
          );
        }
      );
  }
}
