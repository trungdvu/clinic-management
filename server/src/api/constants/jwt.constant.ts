import dotenv from "dotenv";
dotenv.config();

export const ACCESS_TOKEN_SECRET_KEY =
  process.env.ACCESS_TOKEN_SECRET_KEY ?? "clinic-management";
