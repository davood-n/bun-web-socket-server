// file for defining routes and their handlers
import RoutesRegistry  from "./define.middleware"

import { RouteType } from "./core/type-def/enums";
import Auth from "./handlers/auth";
import HelloWorld from "./handlers/hello-world";
import PingBack from "./handlers/ping-back";

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

RoutesRegistry.registerRoute({
  path: "/ping-back",
  handler: PingBack,
  type: RouteType.WEB_SOCKET,
})

export default RoutesRegistry;