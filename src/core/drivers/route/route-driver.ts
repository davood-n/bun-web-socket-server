/**
 * Route driver for the server. Route driver will handle all routes and their corresponding handlers; of course after authenticating their requests which is a JWT containing a payload. The decoded JWT will be passed to a new Context object that will be passed to the handler.
 * @author Davood Najafi <davood@najafi.cc>
 */


import { RouteLogger } from "../../loggers/route-logger";
import {  Route, RouteDriverConfig } from "../../type-def/types";
import RoutesRegistry from "./routes-registry";

export class RouteDriver {
  private _routes: Map<string, Route>;
  private _rootUrl: string;
  private RouteDriverLogger: RouteLogger;
  
  constructor(config: RouteDriverConfig)
  {
    this.RouteDriverLogger = config.RouteDriverLogger;
    this._rootUrl = config.rootUrl;
    this._routes = RoutesRegistry.retrieveRoutes(); // We want to make a copy so that we don't modify the original and it won't update with the original unles we want it to.
  }


  private _refreshRoutes(): void {
    this._routes = RoutesRegistry.retrieveRoutes();
  }

  public findInRouteRegistry(routeName: string): Route {
    const results = RoutesRegistry.retrieveRoute(this.realUrl(routeName));
    return results;
  }

  private realUrl(url: string) {
    let trimmedUrl = url.replace(this._rootUrl, '').trim();
    return trimmedUrl;
  }


}