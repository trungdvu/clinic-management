module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Drugs",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          description: "Paracetamol",
          price: 20000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          description: "Efferalgan",
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          description: "Omeprazole",
          price: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df2",
          description: "Carbimazol",
          price: 90000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df3",
          description: "Rodila",
          price: 20000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df4",
          description: "Prospan",
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df5",
          description: "Neo Codion",
          price: 50000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Drugs", null, {});
  },
};
