import dotenv from "dotenv";

dotenv.config();

export const tokenConfig = {
  secretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
  algorithm: "HS256",
  expiresIn: "30d",
};
