/**
 * Routes registry class is the class that is responsible for registering and storing all routes.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { MiddlewareRouteHandle, RouteHandle } from "../../type-def/abstract";
import { Route } from "../../type-def/types";
import { MiddlewareRouteList } from "../middleware/middleware-route-list";
import { MiddlewareRouteListNode } from "../middleware/middleware-route-list-node";

/**
 * Routes registry class is the class that is responsible for registering and storing all routes.
 * @author Davood Najafi <davood@najafi.cc>
 * 
 * @method registerRoute Registers a route and its handler.
 * @method unregisterRoute Unregisters a route and its handler.
 * @method retrieveRoute Retrieves a route and its handler.
 * @method retrieveRoutes Retrieves all routes and their handlers.
 */
export default class RoutesRegistry {
  private static _routes: Map<string, Route> = new Map<string, Route>();
  private static _middlewareList: MiddlewareRouteList = new MiddlewareRouteList();

  /**
   * Registers a route to the registry.
   * @param {Route} routeObj The route object to register.
   */
  public static registerRoute(routeObj: Route): void {
    const { path } = routeObj;
    this._routes.set(path, routeObj);
  }

  /**
   * Unregisters a route from the registry.
   * @param {string} routePath The path to the route to unregister.
   */
  public static unregisterRoute(routePath: string) {
    this._routes.delete(routePath);
  }

  /**
   * 
   * @param {string} routeName The name of the route to retrieve. 
   * @returns {Route} The route that was retrieved. 
   */
  public static retrieveRoute(routeName: string): Route {
    return this._routes.get(routeName);
  }

  /**
   * Returns all routes in the registry.
   * @returns {Map<string, Route>} The map of all routes.
   */
  public static retrieveRoutes(): Map<string, Route> {
    return this._routes;
  }


  public static registerMiddleware(middlware: MiddlewareRouteHandle): void {
    RoutesRegistry._middlewareList.add(middlware);
  }

  public static unregisterMiddleware(middlware: MiddlewareRouteHandle): void {
    RoutesRegistry._middlewareList.remove(middlware);
  }

  public static retrieveMiddlewareListHead(): MiddlewareRouteListNode {
    return RoutesRegistry._middlewareList.head;
  }

  public static retrieveMiddlewareListTail(): MiddlewareRouteListNode {
    return RoutesRegistry._middlewareList.tail;
  }
  
  public static middlewareList(): MiddlewareRouteList {
    return RoutesRegistry._middlewareList;
  }

}
