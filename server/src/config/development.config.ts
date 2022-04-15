import config from "./config.json";

export interface DevelopmentConfig {
  username: string;
  password: string;
  database: string;
  dialect: string;
  host: string;
}

export const developmentConfig: DevelopmentConfig = {
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  dialect: config.development.dialect,
  host: config.development.host,
};
