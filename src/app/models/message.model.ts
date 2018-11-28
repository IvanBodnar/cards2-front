
export enum MessageType {
  error = 'ERROR',
  warning = 'WARNING',
  success = 'SUCCESS'
}

export default class MessageModel {
  constructor(
    public type: MessageType,
    public title: string,
    public message: string
  ) {}
}
