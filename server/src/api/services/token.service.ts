import jwt, { JwtPayload } from "jsonwebtoken";
import { tokenConfig } from "../../config";

export class TokenService {
  static createToken(value: any): string {
    try {
      return jwt.sign(value, tokenConfig.secretKey, {
        algorithm: "HS256",
        expiresIn: tokenConfig.expiresIn,
      });
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
}
