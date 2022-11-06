/**
 * The master driver that initializes all of the drivers and the server and manages dependencies between them.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerLogger } from "../loggers/server-logger";
import { WebSocketLogger } from "../loggers/web-socket-logger";
import { MasterDriverConfig, ServerDriverConfig } from "../type-def/types";
import { CommandLineDriver } from "./etc/command-line-driver";
import { RouteDriver } from "./route/route-driver";
import { RouteLogger } from "../loggers/route-logger";
import { ServerDriver } from "./server/server-driver";
import { WebSocketDriver } from "./web-socket/web-socket-driver";
import { AuthorizationDriver } from "./authorization/authorization-driver";
import { AuthorizationLogger } from "../loggers/authorization-logger";
import { MiddlewareDriver } from "./middleware/middleware-driver";
import { MiddlewareLogger } from "../loggers/middleware-logger";



export class MasterDriver {
  CommandLineDriver: CommandLineDriver;
  ServerDriver: ServerDriver;
  WebSocketDriver: WebSocketDriver;
  ServerLogger: ServerLogger;
  WebSocketLogger: WebSocketLogger;
  private _port: number;
  private _rootUrl: string;
  RouteDriver: RouteDriver;
  AuthorizationDriver: AuthorizationDriver;
  MiddlewareDriver: MiddlewareDriver;
  RouteLogger: RouteLogger;
  AuthorizationLogger: AuthorizationLogger;
  MiddlewareLogger: MiddlewareLogger;

  
  constructor(config?: MasterDriverConfig) {
    
    this._port = config?.port || 3000;
    this._rootUrl = config?.rootUrl || `http://0.0.0.0:${this._port}`;
    config = {
      port: this._port,
      rootUrl: this._rootUrl,
    };
    
    /**
     * Instansiate in this order: CommandLineDriver, ServerLogger, WebSocketLogger, WebSocketDriver, ServerDriver. We log along the way using the CommandLineDrivers' message method for when we are instansiating ('MASTER-DRIVER' as the second parameter), and success method for when we are done instansiating.
     */
    this.CommandLineDriver = new CommandLineDriver();
    
    this.CommandLineDriver.message('ServerLogger is initializing...', 'MASTER-DRIVER');
    this.ServerLogger = new ServerLogger(this.CommandLineDriver);
    this.CommandLineDriver.success('ServerLogger initialized!');

    this.CommandLineDriver.message('WebSocketLogger is initializing...', 'MASTER-DRIVER');
    this.WebSocketLogger = new WebSocketLogger(this.CommandLineDriver);
    this.CommandLineDriver.success('WebSocketLogger initialized!');
    
    this.CommandLineDriver.message('RouteLogger is initializing...', 'MASTER-DRIVER');
    this.RouteLogger = new RouteLogger(this.CommandLineDriver);
    this.CommandLineDriver.success('RouteLogger initialized!');

    this.CommandLineDriver.message('AuthorizationLogger is initializing...', 'MASTER-DRIVER');
    this.AuthorizationLogger = new AuthorizationLogger(this.CommandLineDriver);
    this.CommandLineDriver.success('AuthorizationLogger initialized!');

    this.CommandLineDriver.message('MiddlewareLogger is initializing...', 'MASTER-DRIVER');
    this.MiddlewareLogger = new MiddlewareLogger(this.CommandLineDriver);
    this.CommandLineDriver.success('MiddlewareLogger initialized!');

    const webSocketDriverConfig = {
      WebSocketLogger: this.WebSocketLogger,
    };
    this.CommandLineDriver.message('WebSocketDriver is initializing...', 'MASTER-DRIVER');
    this.WebSocketDriver = new WebSocketDriver(webSocketDriverConfig);
    this.CommandLineDriver.success('WebSocketDriver initialized!');


    this.CommandLineDriver.message('RouteDriver is initializing...', 'MASTER-DRIVER');
    this.RouteDriver = new RouteDriver({
      RouteDriverLogger: this.RouteLogger,
      port: this._port,
      rootUrl: this._rootUrl,
    });
    this.CommandLineDriver.success('RouteDriver initialized!');

    this.CommandLineDriver.message('AuthorizationDriver is initializing...', 'MASTER-DRIVER');
    this.AuthorizationDriver = new AuthorizationDriver({
      AuthorizationDriverLogger: this.AuthorizationLogger,
    });
    this.CommandLineDriver.success('AuthorizationDriver initialized!');


    this.CommandLineDriver.message('MiddlewareDriver is initializing...', 'MASTER-DRIVER');
    this.MiddlewareDriver = new MiddlewareDriver({
      MiddlewareDriverLogger: this.MiddlewareLogger,
    });
    this.CommandLineDriver.success('MiddlewareDriver initialized!');


    const serverDriverConfig = {
      port: this._port,
      rootUrl: this._rootUrl,
      WebSocketDriver: this.WebSocketDriver,
      RouteDriver: this.RouteDriver,
      ServerLogger: this.ServerLogger,
      AuthorizationDriver: this.AuthorizationDriver,
      MiddlewareDriver: this.MiddlewareDriver,
    } as ServerDriverConfig;
    this.CommandLineDriver.message('ServerDriver is initializing...', 'MASTER-DRIVER');
    this.ServerDriver = new ServerDriver(serverDriverConfig);
    this.CommandLineDriver.success('ServerDriver initialized!');


    console.log('');
    this.CommandLineDriver.fromApp(`Server is serving at http://localhost:${this._port}`);
    this.CommandLineDriver.fromApp('Welcome to the Web Socket Server!');
  }

  public serve() {
    this.ServerDriver.serve();
  }

}