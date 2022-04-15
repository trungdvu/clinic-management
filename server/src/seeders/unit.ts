module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Units",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06c",
          description: "mililiter",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67",
          description: "viên",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Units", null, {});
  },
};
