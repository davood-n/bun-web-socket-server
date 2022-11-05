// file for defining routes and their handlers

import RoutesRegistry from "./drivers/route/routes-registry";

RoutesRegistry.registerRoute("/auth", import.meta.require("./routes/ping-back"));