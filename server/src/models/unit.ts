module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    "Unit",
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
      tableName: "units",
    }
  );

  Unit.associations = (models) => {
    Unit.hasMany(models.MedicalBillDetail, {
      foreignKey: "unitId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Unit;
};
