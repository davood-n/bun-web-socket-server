/**
 * WebSocketLogger allows for logging functions to be abstracted away from the WebSocketDriver. This will ultimately allow for data passthrouugh to the statistics api.
 */

import { Logger } from "../type-def/abstract";

export class WebSocketLogger extends Logger {
  componentName: string;
  // Will make a use for seperate loggers for the server and the web socket server.
  constructor(commandLineDriver: any) {
    super(commandLineDriver);
    this.componentName = "WEB-SOCKET";
  }
}