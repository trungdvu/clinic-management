// import { Op } from "sequelize";
// import { CreateMedicalBillDto, UpdateMedicalBillDto } from "../dtos";
// import { models } from "../models";

// const { MedicalBill } = models;

// export class PatientRepository {
//   async findManyByName(name: string): Promise<typeof MedicalBill[]> {
//     return await MedicalBill.findAll({
//       where: {
//         fullName: { [Op.like]: `%${name}%` },
//       },
//     });
//   }

//   async findMany(): Promise<typeof MedicalBill[]> {
//     return await MedicalBill.findAll();
//   }

//   async findById(id: string): Promise<typeof MedicalBill> {
//     return await MedicalBill.findByPk(id);
//   }

//   async create(dto: CreateMedicalBillDto): Promise<void> {
//     try {
//       return await MedicalBill.create(dto);
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async update(
//     id: string,
//     dto: UpdateMedicalBillDto
//   ): Promise<typeof MedicalBill> {
//     try {
//       const userFound = await this.findById(id);

//       return await userFound.update(dto, {
//         where: {
//           id,
//         },
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   async delete(id: string): Promise<typeof MedicalBill> {
//     try {
//       return await MedicalBill.destroy({
//         where: {
//           id,
//         },
//       });
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
// }
