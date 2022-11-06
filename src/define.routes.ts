// file for defining routes and their handlers
import RoutesRegistry  from "./define.middleware"

import { RouteType } from "./core/type-def/enums";
import Auth from "./handlers/auth";
import HelloWorld from "./handlers/hello-world";

RoutesRegistry.registerRoute({
  path: "/hello-world",
  handler: HelloWorld,
  type: RouteType.WEB,
  authLevel: 30,
})

RoutesRegistry.registerRoute({
  path: "/auth",
  handler: Auth,
  type: RouteType.WEB,
  authLevel: 30,
})

export default RoutesRegistry;