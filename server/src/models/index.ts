import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import { developmentConfig } from "../config";
import fs from "fs";
import path from "path";
import { Identity } from "./identity.model";
import { Drug } from "./drug.model";
import { MedicalBill } from "./medical-bill.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";
import { Unit } from "./unit.model";
import { Usage } from "./usage.model";
import { Patient } from "./patient.model";
import { DiseaseType } from "./disease-type.model";

// const basename = path.basename(__filename);
// const models = fs
//   .readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
//     );
//   })
//   .map(async (file: string) => {
//     const model = await import(path.join(__dirname, file));
//     return model;
//   })
//   .map((model) => {
//     return model;
//   });

export const sequelize = new Sequelize({
  dialect: developmentConfig.dialect as Dialect,
  database: developmentConfig.database,
  username: developmentConfig.username,
  password: developmentConfig.password,
  storage: ":memory",
  models: [
    Identity,
    Drug,
    MedicalBill,
    MedicalBillDetail,
    Unit,
    Usage,
    Patient,
    DiseaseType,
  ],
});

export * from "./identity.model";
export * from "./drug.model";
export * from "./medical-bill-detail.model";
export * from "./medical-bill.model";
export * from "./patient.model";
export * from "./unit.model";
export * from "./usage.model";
export * from "./disease-type.model";
