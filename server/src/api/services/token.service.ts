import jwt from "jsonwebtoken";
import { tokenConfig } from "../../config";

export default class TokenService {
  static createToken(value: any) {
    try {
      return jwt.sign(value, tokenConfig.secretKey, {
        algorithm: "HS256",
        expiresIn: tokenConfig.expiresIn,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  static async decode(tokenValue: string) {
    try {
      return await jwt.verify(tokenValue, tokenConfig.secretKey);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
