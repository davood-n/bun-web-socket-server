/**
 * The master driver that initializes all of the drivers and the server and manages dependencies between them.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ServerLogger } from "../loggers/server-logger";
import { WebSocketLogger } from "../loggers/web-socket-logger";
import { CLIBgColors, CLIFgColors } from "../type-def/enums";
import { MasterDriverConfig } from "../type-def/types";
import { CommandLineDriver } from "./etc/command-line-driver";
import { ServerDriver } from "./server/server-driver";
import { WebSocketDriver } from "./web-socket/web-socket-driver";

export class MasterDriver {
  CommandLineDriver: CommandLineDriver;
  ServerDriver: ServerDriver;
  WebSocketDriver: WebSocketDriver;
  ServerLogger: ServerLogger;
  WebSocketLogger: WebSocketLogger;
  port: number;
  rootUrl: string;

  
  constructor(config?: MasterDriverConfig) {
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
    
    this.CommandLineDriver.message('WebSocketDriver is initializing...', 'MASTER-DRIVER');
    this.WebSocketDriver = new WebSocketDriver({
      WebSocketLogger: this.WebSocketLogger,
    });
    this.CommandLineDriver.success('WebSocketDriver initialized!');

    this.CommandLineDriver.message('ServerDriver is initializing...', 'MASTER-DRIVER');
    this.ServerDriver = new ServerDriver({
      WebSocketDriver: this.WebSocketDriver,
      ServerLogger: this.ServerLogger,
    });
    this.CommandLineDriver.success('ServerDriver initialized!');

    console.log('\n');
    this.CommandLineDriver.message('Welcome to the Web Socket Server!', 'APP', {
      background: CLIBgColors.Black,
      foreground: CLIFgColors.Magenta
    });
  }

  public serve() {
    this.ServerDriver.serve();
  }

}