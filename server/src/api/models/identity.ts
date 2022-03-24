"use strict";

module.exports = (sequelize, DataTypes) => {
  const Identity = sequelize.define(
    "Identity",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      accessToken: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "identities",
    }
  );

  return Identity;
};
