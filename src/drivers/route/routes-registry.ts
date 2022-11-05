/**
 * Routes registry class is the class that is responsible for registering and storing all routes.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { RouteHandle } from "../../type-def/abstract";
import { Route } from "../../type-def/types";

/**
 * Routes registry class is the class that is responsible for registering and storing all routes.
 * @author Davood Najafi <davood@najafi.cc>
 * 
 * @method registerRoute Registers a route and its handler.
 * @method unregisterRoute Unregisters a route and its handler.
 * @method retrieveRoute Retrieves a route and its handler.
 * @method retrieveRoutes Retrieves all routes and their handlers.
 */
export default class RoutesRegistry<K, V> {
  private static _routes: Map<string, Route> = new Map<string, Route>();

  /**
   * Registers a route to the registry.
   * @param {string} route The route to register.
   * @param {Route} handle The handler of the route.
   */
  public static registerRoute(route: string, handle: Route): void {
    this._routes.set(route, handle);
  }

  /**
   * Unregisters a route from the registry.
   * @param {Route} route The route to unregister.
   */
  public static unregisterRoute(route: string) {
    this._routes.delete(route);
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

}
