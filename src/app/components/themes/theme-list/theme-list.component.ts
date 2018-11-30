import {Component, OnInit} from '@angular/core';

import ThemeModel from '../../../models/theme.model';
import {ThemeService} from '../../../services/theme.service';
import {MessageService} from '../../../services/message.service';
import {MessageType} from '../../../models/message.model';


@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themesArray: ThemeModel[];
  addInput: string;

  constructor(
    private themeService: ThemeService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.themeService.themes$
      .subscribe(
        (themes: ThemeModel[]) => {
          this.themesArray = themes;
        },
        error => console.log(error)
      );
  }

  onAdd() {
    this.themeService.addTheme(this.addInput);
    this.addInput = undefined;
  }

  onDelete(id: string) {
    this.messageService.sendMessage(MessageType.warning, 'Seguro que desea eliminar el tema?');
    this.messageService.confirmMessage$
      .subscribe(
        response => {
          if (response) {
            this.themeService.deleteTheme(id);
          }
        }
      );
  }
}
