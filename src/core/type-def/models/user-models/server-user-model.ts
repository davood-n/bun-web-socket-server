/**
 * Model for all server connections that have elevated access to this software.
 */

import { ServerUserModelSpecifications, UserModel } from "../../types";
export class ServerUserModel {

  constructor(modelSpecs: ServerUserModelSpecifications) {
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