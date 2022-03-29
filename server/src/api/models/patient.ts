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

  return Patient;
};
