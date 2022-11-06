/**
 * The authorization driver for the server. The authorization driver will handle all authorization related tasks such as authenticating requests, authorizing requests, and validating requests. It mainly works with JWT tokens to encrypt requests and decrypt them. It will also handle the creation of JWT tokens. An accompanying client sdk auth driver will be made.
 * @author Davood Najafi <davood@najafi.cc>
 */

import { jwt } from '../../lib/jwt'
import { AuthorizationLogger } from '../../loggers/authorization-logger';
import { AuthorizationDriverConfig } from '../../type-def/types';

export class AuthorizationDriver {
  private AuthorizationDriverLogger: AuthorizationLogger;
  constructor(config: AuthorizationDriverConfig) {
    this.AuthorizationDriverLogger = config.AuthorizationDriverLogger;
  }

  public async authenticateRequest(request: Request): Promise<boolean> {
    let isAuthenticated = false;
    const authorizationHeader: null | string = request.headers.get('Authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1]; // this is the token part of Authorization: Bearer <token>
    if (token === null){
      this.AuthorizationDriverLogger.warning("Authorization header is null");
      return false;
    }

    try {
      const verifcationStatus = await jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      if (verifcationStatus) {
        this.AuthorizationDriverLogger.success("Request is authenticated.");
        isAuthenticated = true;
      }
    }catch (err) {
      this.AuthorizationDriverLogger.error("JWT verification failed.");
      return false;
    }
    return isAuthenticated;
  }

  public async encryptMessage(message: string): Promise<string> {
    // Will use JWT to encrypt the message
    const encryptedMsg: string = await jwt.sign(message, process.env.JSON_WEB_TOKEN_SECRET);
    return encryptedMsg;
  }
}