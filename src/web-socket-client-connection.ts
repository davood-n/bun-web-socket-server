/**
 * Provide a client connection model for the WebSocket server.
 */


class WebSocketClientConnection {
  private _id: string;
  private _channel: string;
  private _username: string;
  private _latestMessage: WebSocketPayload;
  private _messageLastSent: number;

  constructor(params: WebSocketClientConnectionParams) {
    this._id = params.id;
    this._channel = params.channel;
    this._username = params.username;
    this._latestMessage = params.latestMessage;
    this._messageLastSent = params.messageLastSent;
  }

  get id(): string {
    return this._id;
  }

  get channel(): string {
    return this._channel;
  }

  get username(): string {
    return this._username;
  }

  get latestMessage(): WebSocketPayload {
    return this._latestMessage;
  }

}

