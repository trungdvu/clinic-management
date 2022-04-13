import fs from "fs";
import path from "path";
import { sequelize } from "../config";
import { DataTypes, Sequelize } from "sequelize";

const basename = path.basename(__filename);
let db = {
  Identity: null,
  Patient: null,
  MedicalBill: null,
  MedicalBillDetail: null,
  Drug: null,
  Unit: null,
  Usage: null,
  DiseaseType: null,
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export const models = {
  Identity: db.Identity,
  Patient: db.Patient,
  MedicalBill: db.MedicalBill,
  MedicalBillDetail: db.MedicalBillDetail,
  Drug: db.Drug,
  Unit: db.Unit,
  Usage: db.Usage,
  DiseaseType: db.DiseaseType,
  sequelize: sequelize,
  Sequelize: Sequelize,
};