module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Usages",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06b",
          description: "Bỏ vô miệng uống",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7096",
          description: "Uống từ từ thôi",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7097",
          description: "Nhai",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7098",
          description: "Ngậm",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Usages", null, {});
  },
};
