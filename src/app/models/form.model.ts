import {State} from './state.model';


export default class FormModel {
  constructor(
    public front: string,
    public back: string,
    public state: State
  ) { }
}
