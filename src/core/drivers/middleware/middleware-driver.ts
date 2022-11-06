/**
 * Middleware routes are stored in a doubly linked list 'MiddlewareRouteList'. This list is used to chain the sequence that the middleware routes need to run. The 'MiddlewareRouteList' is stored on the static class 'RoutesRegistry'.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { MiddlewareRouteHandle } from "../../type-def/abstract";
import { MiddlewareDriverConfig, RouteHandleContext } from "../../type-def/types";
import RouteRegistry from "../route/routes-registry";
import { MiddlewareRouteList } from "./middleware-route-list";
import { MiddlewareRouteListNode } from "./middleware-route-list-node";

export class MiddlewareDriver {
  private _middleware: MiddlewareRouteList;
  private MiddlewareDriverLogger: MiddlewareDriverConfig["MiddlewareDriverLogger"];
  
  constructor(config: MiddlewareDriverConfig) {
    this.MiddlewareDriverLogger = config.MiddlewareDriverLogger;
    this._middleware = RouteRegistry.middlewareList();
  }
  
  public registerMiddleware(middlware: MiddlewareRouteHandle): void {
    this._middleware.add(middlware);
  }

  public unregisterMiddleware(middlware: MiddlewareRouteHandle): void {
    this._middleware.remove(middlware);
  }

  /**
   * Starts the middleware chain.
   */
  public startMiddleware(context: RouteHandleContext): void | true {
    const headOfList: MiddlewareRouteListNode = this._middleware.head;

    if (!headOfList) {
      
      return true;
    }
    // what if we had a function on the middlewarelistnode 'handleNextMiddlewareNode()'?

    // This function computes the next middlware handle.
    // It is called when the current middleware is done.
    return headOfList.route.handle({
      ...context,
      next: () => headOfList.handleNextMiddlewareNode(context),
    });
  }

  

}



