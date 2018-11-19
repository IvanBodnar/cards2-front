
export default class CardModel {
  constructor(
    public _id: string = null,
    public front: string,
    public back: string,
    public themeName: string,
    public score: number = 0
  ) {}
}
