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
      creatorId: DataTypes.UUID,
    },
    {
      freezeTableName: true,
      tableName: "patients",
    }
  );

  Patient.associations = (models) => {
    Patient.hasMany(models.MedicalBill, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    Patient.belongsTo(models.Identity, {
      foreignKey: "creatorId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Patient;
};
