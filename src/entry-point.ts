// entry-point.ts is the entry point for the application.


import { MasterDriver } from "./drivers/master-driver";
const md = new MasterDriver();
md.serve();

