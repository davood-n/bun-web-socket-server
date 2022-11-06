import { MiddlewareRouteHandle } from "../core/type-def/abstract";
import { MiddlewareRouteHandleContext, RouteHandleContext } from "../core/type-def/types";

class Auth extends MiddlewareRouteHandle {
  public async handle(context: MiddlewareRouteHandleContext): Promise<any> {
    if (context.authLevelForRequestedRoute === undefined)
    {
      context.next();
      return true;
    }

    const status = await context.AuthorizationDriver.authenticateRequest(context.request, context.authLevelForRequestedRoute);
    if (status === false) {
      return false;
    }
    context.next(); // move to next middleware if exists
    
    
    return true;
  }
}

export default new Auth();