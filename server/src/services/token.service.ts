import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenConfig } from "../config";

export class TokenService {
  private static currentToken: string;

  static createToken(value: any): string {
    try {
      this.currentToken = jwt.sign(value, tokenConfig.secretKey, {
        algorithm: "HS256",
        expiresIn: tokenConfig.expiresIn,
      });

      return this.currentToken;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async decode(tokenValue: string): Promise<JwtPayload> {
    try {
      return (await jwt.verify(
        tokenValue,
        tokenConfig.secretKey
      )) as JwtPayload;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static getCurrentToken(): string {
    return this.currentToken;
  }
}
