/**
 * Indiviuual route node in the route list.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { MiddlewareRouteHandle } from "../../type-def/abstract";
import { MiddlewareRouteHandleContext, RouteHandleContext } from "../../type-def/types";

export class MiddlewareRouteListNode {
  public route: MiddlewareRouteHandle;
  public next: MiddlewareRouteListNode;
  public prev: MiddlewareRouteListNode;

  constructor(route: MiddlewareRouteHandle) {
    this.route = route;
    this.next = null;
    this.prev = null;
  }

  public handleNextMiddlewareNode(context: RouteHandleContext): void | true {
    // if there is a next node, call the next node's route handle
    if (this.next === null) {
      return true // means chain is finished
    }

    this.next.route.handle({
      ...context,
      next: () => this.next.handleNextMiddlewareNode(context),
    } as MiddlewareRouteHandleContext);
  }
}

