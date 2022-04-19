const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DrugPrices",
      [
        {
          id: "981edb65-d148-4f26-a901-de4a5394d147",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "702681db-5fff-4017-8adc-4b058397cbf8",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67",
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ca9b6c1d-fccb-486d-a5ed-0913bf80fe5e",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a4d5f5ec-92cd-44d5-8e67-41ca5a2f8965",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67",
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DrugPrices", null, {});
  },
};
