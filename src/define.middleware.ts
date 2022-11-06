// file for defining middleware and their handlers



import RoutesRegistry from "./core/drivers/route/routes-registry";

import Auth from "./middleware/auth";


RoutesRegistry.registerMiddleware(Auth);

export default RoutesRegistry;