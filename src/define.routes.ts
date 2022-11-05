// file for defining routes and their handlers

import RoutesRegistry from "./drivers/route/routes-registry";

RoutesRegistry.registerRoute("/ping-back", import.meta.require("./routes/ping-back"));