/**
 * Fake auth middleware test
 */

import { MiddlewareRouteHandle } from "../core/type-def/abstract";
import { MiddlewareRouteHandleContext, RouteHandleContext } from "../core/type-def/types";

class FakeAuthMiddlewareTest extends MiddlewareRouteHandle {
  public handle(context: MiddlewareRouteHandleContext): any {
    console.log("Fake auth middleware test");
  }
}

export default new FakeAuthMiddlewareTest();