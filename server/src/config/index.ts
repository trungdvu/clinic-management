import { developmentConfig } from "./development.config";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const config = developmentConfig;

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://${config.username}:${config.password}@${config.host}:5432/${config.database}`,
  {
    dialect: "postgres",
    dialectOptions: {},
    timezone: "+07:00", // for add to database.
  }
);

export { sequelize, Sequelize };

export * from "./token.config";
export * from "./api.config";
export * from "./development.config";
