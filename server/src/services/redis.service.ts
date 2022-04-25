import { redisClient } from "../config";
import { EXPIRE_TIME } from "../constants";
import { InternalServerError } from "../shared";

export class RedisService {
  static async set(key: string, value: any): Promise<void> {
    try {
      await redisClient.setEx(key, EXPIRE_TIME, value);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async get(key: string): Promise<any> {
    try {
      return redisClient.get(key);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async setExpireTime(key: string, second: number): Promise<void> {
    try {
      await redisClient.expire(key, second);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async has(key: string): Promise<boolean> {
    try {
      return (await this.get(key)) ? true : false;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async resetKeys(): Promise<void> {
    try {
      await redisClient.flushAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
