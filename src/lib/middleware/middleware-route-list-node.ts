/**
 * Indiviuual route node in the route list.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { MiddlewareRouteHandle } from "../../type-def/abstract";

export class MiddlewareRouteListNode {
  public route: MiddlewareRouteHandle;
  public next: MiddlewareRouteListNode;
  public prev: MiddlewareRouteListNode;

  constructor(route: MiddlewareRouteHandle) {
    this.route = route;
    this.next = null;
    this.prev = null;
  }
}
