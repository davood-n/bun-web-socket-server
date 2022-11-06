/**
 * Server driver that controls the websocket server. Server driver will use Bun.serve() to serve an appropriate websocket server.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerLogger } from "../../loggers/server-logger";
import { WebRouteHandle, WebSocketRouteHandle } from "../../type-def/abstract";
import { RouteType } from "../../type-def/enums";
import { Route, RouteHandleContext, ServerDriverConfig } from "../../type-def/types";
import { AuthorizationDriver } from "../authorization/authorization-driver";
import { MiddlewareDriver } from "../middleware/middleware-driver";
import { RouteDriver } from "../route/route-driver";
import { WebSocketDriver } from "../web-socket/web-socket-driver";

export class ServerDriver {

  private WebSocketDriver: WebSocketDriver;
  private RouteDriver: RouteDriver;
  private _port: number;
  private _rootUrl: string;
  private ServerLogger: ServerLogger;
  private AuthorizationDriver: AuthorizationDriver
  private MiddlewareDriver: MiddlewareDriver
  ServerDriverInterface: { json: (payload: { [prop: string]: any; }, status: any) => Response; getLogger: () => ServerLogger; };


  constructor(config: ServerDriverConfig) {
    this.WebSocketDriver = config.WebSocketDriver;
    this.ServerLogger = config.ServerLogger;
    this.RouteDriver = config.RouteDriver;
    this.AuthorizationDriver = config.AuthorizationDriver;
    this.MiddlewareDriver = config.MiddlewareDriver;

    this.ServerDriverInterface = {
      json: this.json,
      getLogger: this.getLogger,
    };


    this._port = config.port;
    this._rootUrl = config.rootUrl;
  }

  /**
   * Adds content type json header to the response and sends the response.
   * @param server Bun server instance
   * @param payload Payload to send to the client
   * @param status response status
   * @returns {Response} Response object
   */
  public json(payload: { [prop: string]: any }, status): Response {
    return new Response(JSON.stringify(payload), {
      headers: {
        'content-type': 'application/json'
      },
      status: status
    });
  }

  public serve() {
    Bun.serve({
      fetch: (req, server) => this.bunFetchHandler(req, server),
      websocket: this.WebSocketDriver.bunWebSocketHandler(),
      port: this._port,
    });
  }

  public getLogger() {
    return this.ServerLogger;
  }

  private bunFetchHandler(req: Request, server) {
    const route: Route = this.RouteDriver.findInRouteRegistry(req.url);
    if (route === undefined) {
      return new Response('Not Found', { status: 404 });
    }
    switch (route.type) {
      case RouteType.WEB:
        return this.handleWebRoute(req, server, route)
      case RouteType.WEB_SOCKET:
        return this.handleWebSocketRoute(req, server, route);
    }

  }
  private handleWebRoute(req: Request, server, route: Route) {
    // Need to turn content type to json


    const context: RouteHandleContext = {
      request: req,
      server: server,
      WebSocketDriver: this.WebSocketDriver,
      AuthorizationDriver: this.AuthorizationDriver,
      ServerDriverInterface: this.ServerDriverInterface
    };
    const res = this.MiddlewareDriver.startMiddleware(context);

    //@ts-ignore bc it seems to be workign fine
    if (res === false) {
      return this.json({ message: 'Forbidden.' }, 403);
    }

    return route.handler.handle(context);
  }


  private handleWebSocketRoute(req: Request, server, route: Route) {
    // have to upgrade connection first then pass it to the context obj
    if (!server.upgrade(req)) {
      this.ServerLogger.error('Failed to upgrade request to websocket.');
      //@ts-ignore because of the above if statement
      route.handler.onUpgradeFailed();
    } else {
      // @ts-ignore
      route.handler.onUpgradeSuccess();
    }

    const context: RouteHandleContext = {
      request: req,
      server: server,
      WebSocketDriver: this.WebSocketDriver,
      AuthorizationDriver: this.AuthorizationDriver,
      ServerDriverInterface: this.ServerDriverInterface
    };

    this.MiddlewareDriver.startMiddleware(context);

  }


}