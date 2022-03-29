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
      fullName: DataTypes.STRING,
      gender: DataTypes.STRING,
      dayOfBirth: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "medical-bills",
    }
  );

  MedicalBill.associations = function (models) {
    MedicalBill.belongsTo(models.Patient, {
      foreignKey: "patient_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MedicalBill;
};
