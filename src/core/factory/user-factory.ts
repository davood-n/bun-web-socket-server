/**
 * Chooses which user factory to use based on their type.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { ClientUserModel } from "../type-def/models/user-models/client-user-model";
import { ServerUserModel } from "../type-def/models/user-models/server-user-model";
import { ClientUserModelSpecifications, ServerUserModelSpecifications } from "../type-def/types";
import { ClientUserFactory } from "./client-user-factory";
import { ServerUserFactory } from "./server-user-factory";


export class UserFactory {
  private clientUserFactory: ClientUserFactory;
  private serverUserFactory: ServerUserFactory;

  constructor() {
    this.clientUserFactory = new ClientUserFactory({});
    this.serverUserFactory = new ServerUserFactory({});
  }

  public manufacture() {} // don't have implementation yet 

  public manufactureClientUserModel(modelSpecs: ClientUserModelSpecifications): ClientUserModel {
    return this.clientUserFactory.createClientModels(modelSpecs);
  }

  public manufactureServerUserModel(modelSpecs: ServerUserModelSpecifications): ServerUserModel {
    return this.serverUserFactory.createServerModels(modelSpecs);
  }
}