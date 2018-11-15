import { Injectable } from '@angular/core';

import {DataService} from './data.service';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private dataservice: DataService
  ) { }
}
