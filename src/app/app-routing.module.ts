import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ThemeListComponent} from './components/themes/theme-list/theme-list.component';
import {CardListComponent} from './components/cards/card-list/card-list.component';
import {CardService} from './services/card.service';
import {ShuffleComponent} from './components/cards/shuffle/shuffle.component';

const routes: Routes = [
  {path: '', component: ThemeListComponent},
  {path: 'cards/:themeName', component: CardListComponent, resolve: { cards: CardService }},
  {path: 'cards/:themeName/shuffle', component: ShuffleComponent, resolve: { cards: CardService }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
