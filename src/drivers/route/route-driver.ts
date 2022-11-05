/**
 * Route driver for the server. Route driver will handle all routes and their corresponding handlers; of course after authenticating their requests which is a JWT containing a payload. The decoded JWT will be passed to a new Context object that will be passed to the handler.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { RouteHandle } from "../../type-def/abstract";
import { MasterDriverConfig, Route } from "../../type-def/types";
import RoutesRegistry from "./routes-registry";

export class RouteDriver {
  private _routes: Map<string, Route>;
  private _rootUrl: string;
  
  constructor(serverDriverConfing: MasterDriverConfig)
  {
    this._rootUrl = serverDriverConfing.rootUrl;
    this._routes = RoutesRegistry.retrieveRoutes(); // We want to make a copy so that we don't modify the original and it won't update with the original unles we want it to.
  }


  private _refreshRoutes(): void {
    this._routes = RoutesRegistry.retrieveRoutes();
  }

  public findInRouteRegistry(routeName: string): Route {
    return RoutesRegistry.retrieveRoute(routeName);
  }

  private realUrl(url) {
    let trimmedUrl = url.replace(this._rootUrl, '').trim();
    return trimmedUrl;
  }


}