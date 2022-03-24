import { SignUpDto } from "../dtos";
import { models } from "../models";

const { Identity } = models;

export class IdentityRepository {
  async findMany(): Promise<typeof Identity[]> {
    return await Identity.findAll();
  }

  async findById(id: string): Promise<typeof Identity> {
    return await Identity.findByPk(id);
  }

  async findByEmail(email: string): Promise<typeof Identity> {
    return await Identity.findOne({ where: { email } });
  }

  async create(signUpDto: SignUpDto) {
    try {
      console.log("sign up dto: ", signUpDto);
      return await Identity.create(signUpDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    identity: typeof Identity
  ): Promise<typeof Identity> {
    try {
      const userFound = await this.findById(id);
      await userFound.update(identity);

      return userFound;
    } catch (error) {
      throw new Error(error);
    }
  }
}
