module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Units",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          description: "mililiter",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67",
          description: "viên",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99",
          description: "chai",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33a01aa9-5730-44b9-a5ec-30a9d3e77777",
          description: "Hộp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99",
          description: "Vỉ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ff760df2-d359-11ec-9d64-0242ac120002",
          description: "Miếng",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Units", null, {});
  },
};
