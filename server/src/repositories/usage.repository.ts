import { CreateUsageDto, UpdateUsageDto } from "../dtos";
import { Usage } from "../models";
import { InternalServerError } from "../shared";

export class UsageRepository {
  static async findMany(): Promise<Usage[]> {
    try {
      const records: Usage[] = await Usage.findAll();
      return records;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<Usage> {
    try {
      const record: Usage = await Usage.findByPk(id);
      return record;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(dto: CreateUsageDto): Promise<Usage> {
    try {
      const response: Usage = await Usage.create(dto);
      return response;
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(id: string, dto: UpdateUsageDto): Promise<void> {
    try {
      await Usage.update(dto, {
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await Usage.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
