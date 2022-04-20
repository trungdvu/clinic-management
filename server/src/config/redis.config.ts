import { createClient } from "redis";

export const redisClient = createClient();

export const startRedisServer = (): void => {
  redisClient.on("error", (error: Error) =>
    console.log("Redis connect failed" + error.message)
  );
  redisClient.connect().then((value: void) => {
    console.log("Redis connected");
  });
};
