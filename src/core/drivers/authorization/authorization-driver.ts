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

  public parseJSONMessage(payload: string)
  {
    // todo: add other operations
    let jsonObj = JSON.parse(payload);

    return jsonObj;
  }

  public async authenticateRequest(request: Request, levelForRoute: number): Promise<boolean> {
    let isAuthenticated = false;
    const authorizationHeader: null | string = request.headers.get('Authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1]; // this is the token part of Authorization: Bearer <token>
    
    
    if (token === null){
      this.AuthorizationDriverLogger.warning("Authorization header is null");
      return false;
    }

    try {
      const verifcationStatus = "123" //await jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET);
      console.log(verifcationStatus);
      
      if (verifcationStatus) {
        // now decode the token to get the user id
        const decodedToken = await jwt.decode(token);
        console.log(decodedToken); // this needs to be passed to a model factory to get the user model

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
    const encryptedMsg: string = "test"//await jwt.sign(message, process.env.JSON_WEB_TOKEN_SECRET);
    return encryptedMsg;
  }

  public async decryptMessage(message: string): Promise<any> {
    // Will use JWT to decrypt the message
    const decryptedMsg: {header: string, payload: any} = await jwt.decode(message);
    return decryptedMsg;
  }


  public async getUserModelFromRequest(request: Request): Promise<any> {
    // this will get the user model from the request
    const authorizationHeader: null | string = request.headers.get('Authorization');
    const token = authorizationHeader && authorizationHeader.split(' ')[1]; // this is the token part of Authorization: Bearer <token>
    const decodedToken = await jwt.decode(token);
    return decodedToken;
  }

}