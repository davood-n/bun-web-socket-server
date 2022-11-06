// entry-point.ts is the entry point for the application.


import { MasterDriver } from "./core/drivers/master-driver";
import RoutesRegistry from "./define.routes";

let port = 3000;

if (process.argv[2] && process.argv[2] === '-p' || process.argv[2] === '--port') {
  port = parseInt(process.argv[3]) ?? 3000;
}



const md = new MasterDriver({
  port: port,
  RoutesRegistry: RoutesRegistry,
});


md.serve();

