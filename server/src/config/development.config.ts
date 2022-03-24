import config from "./config.json";

export const developmentConfig = {
  username: config.development.username,
  password: config.development.password,
  database: config.development.database,
  host: config.development.host,
};
