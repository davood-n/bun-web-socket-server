import { RouteDriver } from "../drivers/route/route-driver";
import { ServerDriver } from "../drivers/server/server-driver";
import { WebSocketDriver } from "../drivers/web-socket/web-socket-driver";
import { MiddlewareRouteList } from "../lib/middleware/middleware-route-list";
import { ServerLogger } from "../loggers/server-logger";
import { WebSocketLogger } from "../loggers/web-socket-logger";
import { MiddlewareRouteHandle, RouteHandle } from "./abstract";
import { CLIBgColors, CLIDefaultColors, CLIFgColors, RouteType } from "./enums";

// ---------- Basic Types -------------//
export type Dictonary<K,V> = {
  [prop: string]: any
}
// ---------- End Basic Types ---------//


// ---------- Master Driver -----------//
export type MasterDriverConfig = {
  port?: number,
  rootUrl?: string,
}
// ---------- End Master Driver -------//


// ---------- Server Driver -----------//
export type ServerDriverConfig = {
  port?: number,
  rootUrl?: string,
  WebSocketDriver: WebSocketDriver,
  RouteDriver: RouteDriver,
  ServerLogger: ServerLogger,
}; // ServerDriverConfig used to create a ServerDriver instance
// ---------- End Server Driver -------//


// ---------- Route --------//
export type RouteHandleContext = {
  request: Request,
  server: any,
  middleware?: MiddlewareRouteList,
  WebSocketDriver: WebSocketDriver
}

export type Route = {
  path: string,
  handler: RouteHandle | ((context: RouteHandleContext) => void),
  type: RouteType,
}


// ---------- WebSocket Types ---------//
export type WebSocketDriverConfig = {
  WebSocketLogger: WebSocketLogger,
  port?: number,
  rootUrl?: string,

}; // WebSocketDriverConfig used to create a WebSocketDriver instance
export type WebSocketPayload = { // WebSocketPayload is the payload that is sent to the client.
  action: string,
  data: any
};
export type WebSocketClientConnectionParams = { // Used to create a new WebSocketClientConnection instance
  id: string,
  channel: string,
  username: string
  latestMessage: WebSocketPayload, // message or payload
  messageLastSent: number, // Unix timestamp
  role: number,
};
// ---------- End WebSocket Types -----//




// ---------- CLI Types -----------//




export type CLIColorProfile = {
  foreground: CLIFgColors,
  background: CLIBgColors,
  modifiers?: CLIDefaultColors[]
}

export type CLIMessageBuffer = {
  message: string,
  type: string,
}

export type CommandLineDriverConfig = {
  colorProfile?: CLIColorProfile,
}

export type CommandLinePayload = { // CommandLinePayload is the payload that is sent to the server from the command line.
  type?: string,
  message?: string,
  color?: CLIColorProfile
  // ^^ These are all the acceptable payloads for color choice. 
};

// ---------- End CLI Types ---------//
