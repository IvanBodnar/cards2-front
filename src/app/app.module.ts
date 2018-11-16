import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ThemeListComponent } from './components/themes/theme-list/theme-list.component';
import { CardListComponent } from './components/cards/card-list/card-list.component';
import { CardFormComponent } from './components/cards/card-form/card-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeListComponent,
    CardListComponent,
    CardFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
