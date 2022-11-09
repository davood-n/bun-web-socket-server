/**
 * Model for all client connections that don't have elevated access to this software. Such as a user recieving messages from server, and sending  client messages that are client formatted.
 */

import { ClientUserModelSpecifications, UserModel } from "../../type-def/types";

export class ClientUserModel implements UserModel {
  constructor(modelSpecs: ClientUserModelSpecifications) {
    this.id = modelSpecs.id;
    this.authLevel = modelSpecs.authLevel;
  }
  public id: string;
  public authLevel: number;


  getId(): string {
    return this.id;
  }
  getAuthLevel(): number {
    return this.authLevel;
  }
}