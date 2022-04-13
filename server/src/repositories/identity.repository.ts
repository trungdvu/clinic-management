import { InternalServerError } from "../shared";
import { SignUpDto } from "../dtos";
import { models } from "../models";

const { Identity } = models;

export class IdentityRepository {
  static async findMany(): Promise<typeof Identity[]> {
    try {
      return await Identity.findAll();
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findById(id: string): Promise<typeof Identity> {
    try {
      return await Identity.findByPk(id);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async findByEmail(email: string): Promise<typeof Identity> {
    try {
      return await Identity.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async create(signUpDto: SignUpDto) {
    try {
      return await Identity.create(signUpDto);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }

  static async update(
    id: string,
    identity: typeof Identity
  ): Promise<typeof Identity> {
    try {
      const userFound = await this.findById(id);

      return await userFound.update(identity);
    } catch (error) {
      throw new InternalServerError(error.message);
    }
  }
}
