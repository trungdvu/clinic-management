import { createClient } from "redis";
import { RedisService } from "../services/redis.service";

export const redisClient = createClient();

export const startRedisServer = async (): Promise<void> => {
  redisClient.on("error", (error: Error) =>
    console.log("Redis connect failed" + error.message)
  );
  redisClient.connect().then((value: void) => {
    console.log("Redis connected");
  });

  await RedisService.resetKeys();
};
