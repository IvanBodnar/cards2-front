
export enum MessageType {
  info = 'info',
  warning = 'warning',
  positive = 'positive',
  negative = 'negative'
}

export default class MessageModel {
  constructor(
    public type: MessageType,
    public title: string,
    public message: string
  ) {}
}
