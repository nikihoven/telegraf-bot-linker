export class ChatBotException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChatBotException';
  }
}
