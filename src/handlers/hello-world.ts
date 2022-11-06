/**
 * 
 */

import { RouteHandle, WebRouteHandle } from "../core/type-def/abstract";
import { RouteHandleContext } from "../core/type-def/types";

class HelloWorld extends WebRouteHandle {

  public async handle(context: RouteHandleContext) {
    return new Response("Hello world!", { status: 200 });
  }

  public onMessage() {
    throw new Error("Method not implemented.");
  }


}

export default new HelloWorld();