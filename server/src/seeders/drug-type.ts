module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DrugTypes",
      [
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793e1f9",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3310129f-6a19-47f2-a424-4737f3936da8",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4c556d9c-045c-4043-817b-9bb487510ff8",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DrugTypes", null, {});
  },
};
