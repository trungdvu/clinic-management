module.exports = (sequelize, DataTypes) => {
  const DiseaseType = sequelize.define(
    "DiseaseType",
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
      tableName: "diseaseTypes",
    }
  );

  DiseaseType.associations = (models) => {
    DiseaseType.belongsTo(models.MedicalBill, {
      foreignKey: "diseaseTypeId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return DiseaseType;
};
