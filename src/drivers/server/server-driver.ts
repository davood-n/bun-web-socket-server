/**
 * Server driver that controls the websocket server. Server driver will use Bun.serve() to serve an appropriate websocket server.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerLogger } from "../../loggers/server-logger";
import { WebRouteHandle } from "../../type-def/abstract";
import { RouteType } from "../../type-def/enums";
import { Route, RouteHandleContext, ServerDriverConfig } from "../../type-def/types";
import { RouteDriver } from "../route/route-driver";
import { WebSocketDriver } from "../web-socket/web-socket-driver";

export class ServerDriver {

  private WebSocketDriver: WebSocketDriver;
  private RouteDriver: RouteDriver;
  private port: any;
  private rootUrl: string;
  private ServerLogger: ServerLogger;

  constructor(config: ServerDriverConfig) {
    this.WebSocketDriver = config.WebSocketDriver;
    this.ServerLogger = config.ServerLogger;
    this.RouteDriver = config.RouteDriver;

  }



  public serve() {
    // Bun.serve({
    //   fetch: (req, server) => this.bunFetchHandler(req, server),
    //   websocket: this.WebSocketDriver.bunWebSocketHandler(),
    // });
  }

  public getLogger() {
    return this.ServerLogger;
  }

  private bunFetchHandler(req: Request, server) {
    const route: Route = this.RouteDriver.findInRouteRegistry(req.url);
    switch(route.type) {
      case RouteType.WEB:
        this.handleWebRoute(req, server, route)
        break;
      case RouteType.WEB_SOCKET:
        this.handleWebSocketRoute(req, server, route);
        break;
    }




    // if (this.realUrl(req.url) === "/chat") {
    //   console.log("request for chat");
    //   if (
    //     server.upgrade(req, {
    //       // This User object becomes ws.data
    //       data: {
    //         clientId: 1, // Need to make this dynamic eventually
    //         name: "Friend",
    //       },
    //       // Pass along some headers to the client
    //       headers: {
    //         "Set-Cookie": "name=" + new URL(req.url).searchParams.get("name"),
    //       },
    //     })
    //   )
    //     return;
    // }
    // Object
    // return new Response("Invalid request.", { status: 400 });
  
  }
  handleWebRoute(req: Request, server, route: Route) {
    this.ServerLogger.log("Web route found: " + route.path);
  }


  private handleWebSocketRoute(req: Request, server, route: Route)
  {
    if (typeof route !== typeof WebRouteHandle)
    {
      this.ServerLogger.error(`Route ${route.path} is not a WebRouteHandle`);
      return;
    }

    // have to upgrade connection first then pass it to the context obj
    if (!server.upgrade(req))
    {
      this.ServerLogger.error('Failed to upgrade request to websocket.');
      //@ts-ignore because of the above if statement
      route.handler.onUpgradeFailed();
    }

    const context: RouteHandleContext = {
      request: req,
      server: server,
      WebSocketDriver: this.WebSocketDriver,
    };


  }


}