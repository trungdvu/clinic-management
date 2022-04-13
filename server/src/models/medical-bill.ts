"use strict";

module.exports = (sequelize, DataTypes) => {
  const MedicalBill = sequelize.define(
    "MedicalBill",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      diseaseTypeId: DataTypes.UUID,
      symptomDescription: DataTypes.STRING,
      prediction: DataTypes.STRING,
      patientId: DataTypes.UUID,
    },
    {
      freezeTableName: true,
      tableName: "medicalBills",
    }
  );

  MedicalBill.associations = (models) => {
    MedicalBill.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MedicalBill.hasMany(models.DiseaseType, {
      foreignKey: "diseaseTypeId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MedicalBill.hasOne(models.MedicalBillDetail, {
      foreignKey: "diseaseTypeId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MedicalBill;
};
