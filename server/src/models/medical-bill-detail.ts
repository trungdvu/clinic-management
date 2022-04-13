"use strict";

module.exports = (sequelize, DataTypes) => {
  const MedicalBillDetail = sequelize.define(
    "MedicalBillDetail",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      drugId: DataTypes.UUID,
      unitId: DataTypes.UUID,
      usageId: DataTypes.UUID,
      medicalBillId: DataTypes.UUID,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      tableName: "medicalBillDetails",
    }
  );

  MedicalBillDetail.associations = (models) => {
    MedicalBillDetail.belongsTo(models.MedicalBill, {
      foreignKey: "medicalBillId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MedicalBillDetail.hasMany(models.Drug, {
      foreignKey: "drugId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MedicalBillDetail.hasMany(models.Unit, {
      foreignKey: "unitId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    MedicalBillDetail.hasMany(models.Usage, {
      foreignKey: "usageId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return MedicalBillDetail;
};
