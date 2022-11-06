/**
 * A way for the RouteHandles to communicate with the server object safley.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerLogger } from "../../loggers/server-logger";

export interface ServerDriverInterface {
  json(payload: { [prop: string]: any }, status): Response;
  getLogger(): ServerLogger;
}
