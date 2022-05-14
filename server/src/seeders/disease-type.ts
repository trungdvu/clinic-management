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
          id: "c7558634-d35c-11ec-9d64-0242ac120002",
          description: "Sốt",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dfa62892-d35c-11ec-9d64-0242ac120002",
          description: "Phổ thông",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e52a636e-d35c-11ec-9d64-0242ac120002",
          description: "Xương khớp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fcfaa3a0-d35c-11ec-9d64-0242ac120002",
          description: "Tim mạch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0feca01c-d35d-11ec-9d64-0242ac120002",
          description: "Chấn thương",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1e05810a-d35d-11ec-9d64-0242ac120002",
          description: "Huyết áp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "16fca532-d35d-11ec-9d64-0242ac120002",
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
