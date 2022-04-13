module.exports = (sequelize, DataTypes) => {
  const Drug = sequelize.define(
    "Drug",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
      tableName: "drugs",
    }
  );

  Drug.associations = (models) => {
    Drug.belongsTo(models.MedicalBillDetail, {
      foreignKey: "drugId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Drug;
};
