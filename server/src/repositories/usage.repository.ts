import { CreateUsageDto, UpdateUsageDto } from "../dtos";
import { Usage } from "../models";
import { InternalServerError } from "../shared";

export class UsageRepository {
  static async findMany(): Promise<Usage[]> {
    try {
      return await Usage.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Usage> {
    try {
      return await Usage.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateUsageDto): Promise<Usage> {
    try {
      return await Usage.create(dto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateUsageDto): Promise<any> {
    try {
      return await Usage.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<number> {
    try {
      return await Usage.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
