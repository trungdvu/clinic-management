"use strict";

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "Patient",
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
      phoneNumber: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "patients",
    }
  );

  Patient.associations = (models) => {
    Patient.belongsTo(models.MedicalBill, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Patient;
};
