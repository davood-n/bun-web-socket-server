/**
 * WebSocket driver that uses the native WebSocket API to control the WebSocket
 * @author Davood Najafi <davood@najafi.cc>
 */


const defaultConfig = {};

export class WebSocketDriver {
  
  constructor(config: WebSocketDriverConfig = defaultConfig) {
   
  }

  public bunWebSocketHandler() {
    return {
      open(ws) {
        console.log("WebSocket opened");
        console.log(ws);
  
        // subscribe to "the-group-chat" topic
        ws.subscribe("the-group-chat");
      },
  
      message(ws, message) {
        // In a group chat, we want to broadcast to everyone
        // so we use publish()
        // ws.publish("the-group-chat", `${ws.data.name}: ${message}`);
        ws.send(message);
      },
  
      close(ws: any, code: number, reason: string) {
        ws.publish("the-group-chat", `${ws.data.name} left the chat`);
      },
  
      drain(ws) {
        console.log("Please send me data. I am ready to receive it.");
      },
  
      // enable compression
      perMessageDeflate: true,

    };
  }


  public createConnection()
  {

  }

  public closeConnection()
  {

  }

  public sendToClient(payload: WebSocketPayload)
  {

  }
}