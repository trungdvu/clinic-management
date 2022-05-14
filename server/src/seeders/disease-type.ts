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
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f09111",
          description: "Sốt",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f09uhtd",
          description: "Phổ thông",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f0981q0",
          description: "Xương khớp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f09tyq0",
          description: "Tim mạch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f097676",
          description: "Chấn thương",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "861d2fd0-5db2-4fb9-aa1c-d8787f09kkkk",
          description: "Huyết áp",
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
