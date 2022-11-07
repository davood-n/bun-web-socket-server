import RoutesRegistry from "../../define.routes";
import { AuthorizationDriver } from "../drivers/authorization/authorization-driver";
import { MiddlewareDriver } from "../drivers/middleware/middleware-driver";
import { RouteDriver } from "../drivers/route/route-driver";
import { ServerDriverInterface } from "../drivers/server/server-driver-interface";
import { WebSocketDriver } from "../drivers/web-socket/web-socket-driver";
import { AuthorizationLogger } from "../loggers/authorization-logger";
import { RouteLogger } from "../loggers/route-logger";
import { ServerLogger } from "../loggers/server-logger";
import { WebSocketLogger } from "../loggers/web-socket-logger";
import { RouteHandle } from "./abstract";
import { CLIBgColors, CLIDefaultColors, CLIFgColors, RouteType } from "./enums";

// ---------- Basic Types -------------//
export type Dictonary<K,V> = {
  [prop: string]: any
}
// ---------- End Basic Types ---------//


// ---------- Master Driver -----------//
export type MasterDriverConfig = {
  RoutesRegistry?: RoutesRegistry,
  port?: number,
  rootUrl?: string,
}
// ---------- End Master Driver -------//

export type RouteDriverConfig = {
  RouteDriverLogger: RouteLogger,
  port?: number,
  rootUrl?: string,
}

export type AuthorizationDriverConfig = {
  AuthorizationDriverLogger: AuthorizationLogger,
}

export type MiddlewareDriverConfig = {
  MiddlewareDriverLogger: RouteLogger,
}

// ---------- Server Driver -----------//
export type ServerDriverConfig = {
  port?: number,
  rootUrl?: string,
  WebSocketDriver: WebSocketDriver,
  RouteDriver: RouteDriver,
  ServerLogger: ServerLogger,
  AuthorizationDriver: AuthorizationDriver,
  MiddlewareDriver: MiddlewareDriver,
}; // ServerDriverConfig used to create a ServerDriver instance
// ---------- End Server Driver -------//


// ---------- Route --------//
export type RouteHandleContext = {
  authLevelForRequestedRoute?: number,
  request: Request,
  server: any,
  ServerDriverInterface: ServerDriverInterface,
  WebSocketDriver: WebSocketDriver,
  AuthorizationDriver: AuthorizationDriver,
}

export type MiddlewareRouteHandleContext = {
  authLevelForRequestedRoute?: number,
  request: Request,
  server: any,
  WebSocketDriver: WebSocketDriver,
  ServerDriverInterface: ServerDriverInterface,
  AuthorizationDriver: AuthorizationDriver,
  next: () => void | true | false, // can continue to next middleware or end the chain?
}

export type Route = {
  path: string,
  handler: RouteHandle,
  type: RouteType,
  authLevel?: number,
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



export interface UserModel {
  id: string,
  authLevel: number,

  getId(): string,
  getAuthLevel(): number,
}


export type ClientUserFactoryConfig = {
  logClientModels?: boolean,
}

export type ServerUserFactoryConfig = {
  logClientModels?: boolean,
};

export type ClientUserModelSpecifications = {
  id: string,
  authLevel?: number,
  // Todo: add more fields
}
export type ServerUserModelSpecifications = {
  id: string,
  authLevel?: number,
  // Todo: add more fields
}

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
