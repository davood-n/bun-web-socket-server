/**
 * Creates as many as client user models from paramters as needed.
 * 
 */

import { ClientUserModel } from "../type-def/models/user-models/client-user-model";
import { ClientUserFactoryConfig, ClientUserModelSpecifications } from "../type-def/types";

export class ClientUserFactory {
  constructor(config: ClientUserFactoryConfig) {
  }

  

  public createClientModels(modelSpecs: ClientUserModelSpecifications): ClientUserModel {
    return new ClientUserModel(modelSpecs);
  }
}