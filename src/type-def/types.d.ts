// ---------- Basic Types -------------//
type Dictonary = {
  [prop: string]: any
}
// ---------- End Basic Types ---------//


// ---------- WebSocket Types ---------//
type WebSocketDriverConfig = {
  port?: number,
  rootUrl?: string,

}; // WebSocketDriverConfig used to create a WebSocketDriver instance
type WebSocketPayload = { // WebSocketPayload is the payload that is sent to the client.
  action: string,
  data: any
};
type WebSocketClientConnectionParams = { // Used to create a new WebSocketClientConnection instance
  id: string,
  channel: string,
  username: string
  latestMessage: WebSocketPayload, // message or payload
  messageLastSent: number, // Unix timestamp
  role: number,
};
// ---------- End WebSocket Types -----//


