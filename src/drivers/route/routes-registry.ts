/**
 * Routes registry class is the class that is responsible for registering and storing all routes.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { RouteHandle } from "../../type-def/abstract";

 export default class RoutesRegistry {
  private static _routes: Map<string, RouteHandle> = new Map<string, RouteHandle>();

  /**
   * Registers a route to the registry.
   * @param {string} route The route to register.
   * @param {RouteHandle} handle The handler of the route.
   */
  public static registerRoute(route: string, handle: RouteHandle): void {
    this._routes.set(route, handle);
  }

  /**
   * Unregisters a route from the registry.
   * @param {RouteHandle} route The route to unregister.
   */
  public static unregisterRoute(route: string) {
    this._routes.delete(route);
  }

  /**
   * 
   * @param {string} routeName The name of the route to retrieve. 
   * @returns {RouteHandle} The route that was retrieved. 
   */
  public static retrieveRoute(routeName: string): RouteHandle {
    return this._routes.get(routeName);
  }

  /**
   * Returns all routes in the registry.
   * @returns {Map<string, RouteHandle>} The map of all routes.
   */
  public static retrieveRoutes(): Map<string, RouteHandle> {
    return this._routes;
  }

}
