/**
 * Route logger to create verbose logs for routes.
 * @classdesc This class creates a way for the route driver to log to the console and eventually log to storage or a database.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { CommandLineDriver } from "../drivers/etc/command-line-driver";
import { Logger } from "../type-def/abstract";

export class RouteLogger extends Logger {
  componentName: string;
  // Will make a use for seperate loggers for the server and the web socket server.
  constructor(commandLineDriver: CommandLineDriver) {
    super(commandLineDriver);
    this.componentName = "ROUTE";
  }
}