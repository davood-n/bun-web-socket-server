/**
 * First web socket route i've ever done.
 */

import { RouteHandle } from "../type-def/abstract";
import { RouteHandleContext } from "../type-def/types";

class PingBack extends RouteHandle {
  public handle(context: RouteHandleContext) {
    
  }

  public onMessage() {
    throw new Error("Method not implemented.");
  }
}