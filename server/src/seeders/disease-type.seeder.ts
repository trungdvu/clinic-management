module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DiseaseTypes",
      [
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f097e90",
          description: "Cúm",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33b21741-2dc3-4144-8554-da7cdf3544ac",
          description: "Lao phổi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DiseaseTypes", null, {});
  },
};
