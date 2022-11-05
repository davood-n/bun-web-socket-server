/**
 * Server driver that controls the websocket server. Server driver will use Bun.serve() to serve an appropriate websocket server.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerDriverConfig } from "../../type-def/types";
import { RouteDriver } from "../route/route-driver";
import { WebSocketDriver } from "../web-socket/web-socket-driver";

export class ServerDriver {

  private WebSocketDriver: WebSocketDriver;
  private RouteDriver: RouteDriver;
  private port: any;
  private rootUrl: string;
  private ServerLogger: import("c:/Users/davidn000/Desktop/code/bun-web-socket-server/src/loggers/server-logger").ServerLogger;

  constructor(config: ServerDriverConfig) {
    this.WebSocketDriver = config.WebSocketDriver;
    this.ServerLogger = config.ServerLogger;


    this.ServerLogger.message('RouteDriver is initializing...');
    this.RouteDriver = new RouteDriver();
    this.ServerLogger.success('RouteDriver initialized!');


    this.port = config.port || 3000;
    this.rootUrl = config.rootUrl || `http://0.0.0.0:${this.port}`;
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

}