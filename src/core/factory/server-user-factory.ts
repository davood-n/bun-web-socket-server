import { ServerUserModel } from "../models/user-models/server-user-model";
import { ServerUserFactoryConfig, ServerUserModelSpecifications } from "../type-def/types";

export class ServerUserFactory {
  constructor(config: ServerUserFactoryConfig) {
  }

  

  public createServerModels(modelSpecs: ServerUserModelSpecifications): ServerUserModel {
    return new ServerUserModel(modelSpecs);
  }
}
