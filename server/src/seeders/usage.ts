module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Usages",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06b",
          description: "Uống bình thường",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7096",
          description: "Uống từ từ từng ngụm nhỏ",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7097",
          description: "Nhai và uống nước",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "baf97481-a315-43c0-80d4-a5719a3b7098",
          description: "Ngậm bên dưới lưỡi cho đến khi tan hết",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "5da52942-d35c-11ec-9d64-0242ac120002",
          description: "Dán vào vị trí đau nhức",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "8a9ded6c-d35c-11ec-9d64-0242ac120002",
          description: "Nhỏ từ 1-2 giọt vào miệng",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "ab46f6c6-d35c-11ec-9d64-0242ac120002",
          description: "Thoa đều và bóp mạnh vùng thoa",
          createdAt: "2022-12-04 01:00:00-07",
          updatedAt: "2022-12-04 01:00:00-07",
        },
        {
          id: "b25f5304-d35c-11ec-9d64-0242ac120002",
          description: "Đắp lên vết thương",
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
