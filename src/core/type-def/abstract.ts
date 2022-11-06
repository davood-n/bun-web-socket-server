import RoutesRegistry from "../../define.routes";
import { CommandLineDriver } from "../drivers/etc/command-line-driver";
import { CLIColorProfile, MiddlewareRouteHandleContext, RouteHandleContext } from "./types";

/**
 * Logger is an abstract class that allows for the creation of different loggers. This will allow for the creation of different loggers for different purposes. This will add an aditional layer of features on top of the command line driver. Cacheing, storage, and other features will be added to this class. For now we will add only the basic features.
 */
export abstract class Logger {
  abstract componentName: string;
  commandLineDriver: CommandLineDriver;

  constructor(commandLineDriver: CommandLineDriver) {
    this.commandLineDriver = commandLineDriver;
  }

  public log(message: string): void{
    this.commandLineDriver.log(message, this.componentName + '-LOGGER');
  }
  public error(message: string): void
  {
    this.commandLineDriver.error(message, this.componentName + '-LOGGER');
  }
  public success(message: string): void
  {
    this.commandLineDriver.success(message, this.componentName + '-LOGGER');
  }
  public warning(message: string): void
  {
    this.commandLineDriver.warning(message, this.componentName + '-LOGGER');
  }
  public message(message: string, color?: CLIColorProfile): void
  {
    this.commandLineDriver.message(message, this.componentName + '-LOGGER', color);
  }
}


export abstract class RouteHandle {
  public abstract handle(context: RouteHandleContext): any;
}

export abstract class MiddlewareRouteHandle {
  public abstract handle(context: MiddlewareRouteHandleContext): void;

}


export abstract class WebRouteHandle extends RouteHandle {
  public abstract handle(context: RouteHandleContext): Promise<Response>;
  
  private middleware(): void{
    
  }
}

// Create websockerroutes later focus on ^^

export abstract class WebSocketRouteHandle extends RouteHandle {
  
  public async handle(context: RouteHandleContext): Promise<Response>{
    return await new Response("Hello world!", { status: 200 });
  }

  public abstract onUpgradeFailed(): void;
  public abstract onUpgradeSuccess(): void;

  public abstract onMessage(): void;
  
  public broadcast(): void{
    // need to some how access the context that is passed in to the handle method.
  }
}