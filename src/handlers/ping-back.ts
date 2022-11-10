/**
 * First web socket route i've ever done.
 */

import { WebSocketRouteHandle } from "../core/type-def/abstract";
import { RouteHandleContext } from "../core/type-def/types";

class PingBack extends WebSocketRouteHandle {
  public onUpgradeFailed(): void {
    
    this.context.WebSocketDriver.getLogger().error("PingBack route failed to connect");
  }

  public onUpgradeSuccess(): void {
    this.context.server.upgrade(this.context.request);
    this.context.WebSocketDriver.getLogger().info("PingBack route connected");
  }

  public onMessage(msg: Object): void {
    this.broadcast(msg);
  }
}

export default new PingBack();