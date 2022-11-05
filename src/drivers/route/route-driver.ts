/**
 * Route driver for the server. Route driver will handle all routes and their corresponding handlers; of course after authenticating their requests which is a JWT containing a payload. The decoded JWT will be passed to a new Context object that will be passed to the handler.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { Dictonary } from "../../type-def/types";

export class RouteDriver {
  
  public RouteRegistry: Dictonary<string, undefined>;

  constructor()
  {
    this.RouteRegistry = {};

  }


  public registerRoute(route: string, handler: any)
  {

  }

  private realUrl(url) {
    // let trimmedUrl = url.replace(this.rootUrl, '').trim();
    // return trimmedUrl;
  }


}