import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { developmentConfig } from "../config";
import { DiseaseType } from "./disease-type.model";
import { DrugPrice } from "./drug-price.model";
import { Drug } from "./drug.model";
import { Identity } from "./identity.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";
import { MedicalBill } from "./medical-bill.model";
import { Patient } from "./patient.model";
import { Unit } from "./unit.model";
import { Usage } from "./usage.model";
import { DrugType } from "./drug-type.model";
import { MedicalBillDiseaseType } from "./medical-bill-disease-type.model";
import { BillPayment } from "./bill-payment.model";

export const sequelize = new Sequelize({
  dialect: (developmentConfig.dialect as Dialect),
  host: process.env.POSTGRES_HOST ?? developmentConfig.host,
  database: process.env.POSTGRES_DATABASE ?? developmentConfig.database,
  username: process.env.POSTGRES_USERNAME ?? developmentConfig.username,
  password: process.env.POSTGRES_PASSWORD ?? developmentConfig.password,
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
    DrugPrice,
    DrugType,
    MedicalBillDiseaseType,
    BillPayment,
  ],
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
    useUTC: false,
  },
  timezone: "+07:00",
});

export * from "./disease-type.model";
export * from "./drug.model";
export * from "./identity.model";
export * from "./medical-bill-detail.model";
export * from "./medical-bill.model";
export * from "./patient.model";
export * from "./unit.model";
export * from "./usage.model";
export * from "./drug-price.model";
export * from "./drug-type.model";
export * from "./medical-bill-disease-type.model";
export * from "./bill-payment.model";
