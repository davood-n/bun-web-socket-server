/**
 * 
 */

import { WebRouteHandle } from "../core/type-def/abstract";
import { RouteHandleContext } from "../core/type-def/types";

class Auth extends WebRouteHandle {

  public async handle(context: RouteHandleContext) {
    
    // const authStatus = await context.AuthorizationDriver.authenticateRequest(context.request);

    const queryTest = await context.AuthorizationDriver.encryptMessage("Hello World");

    return context.ServerDriverInterface.json({
      access_token: queryTest,
    }, 200);
  }

  public onMessage() {
    throw new Error("Method not implemented.");
  }


}

export default new Auth();