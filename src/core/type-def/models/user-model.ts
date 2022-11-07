/**
 * User model that is made in facotories to attach an object to a session or to a request.
 * @author Davood Najafi <davood@najafi.cc>
 */

class UserModel {
  private _id: string; // the id of the user
  private _authLevel: number; // the auth level of the user

  constructor(id: string, authLevel: number) {
    this._id = id;
    this._authLevel = authLevel;
  }

  public get id(): string {
    return this._id;
  }

  public get authLevel(): number {
    return this._authLevel;
  }

}