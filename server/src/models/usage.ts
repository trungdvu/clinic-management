module.exports = (sequelize, DataTypes) => {
  const Usage = sequelize.define(
    "Usage",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: DataTypes.STRING,
    },
    {
      freezeTableName: true,
      tableName: "usages",
    }
  );

  Usage.associations = (models) => {
    Usage.belongsTo(models.MedicalBillDetail, {
      foreignKey: "usageId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Usage;
};
