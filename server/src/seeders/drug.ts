module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Drugs",
      [
        {
          id: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          description: "Paracetamol",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          description: "Efferalgan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          description: "Omeprazole",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df2",
          description: "Carbimazol",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df3",
          description: "Rodila",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df4",
          description: "Prospan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be640cd-7704-4250-a089-49e172c04df5",
          description: "Neo Codion",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e172c04doo",
          description: "Clorpheniramin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e172c7381",
          description: "Hadocolcen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e1727ye3a",
          description: "Cottuf",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e172kyggf",
          description: "Nostravin", //thuốc nhỏ mũi, 1 – 2 giọt/ lần
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e17977721",
          description: "Pseudoephedrine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e17900000",
          description: "Dextromethorphan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e17900999",
          description: "Eucalyptine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e17911111",
          description: "Pholcodine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-a089-49e17922222",
          description: "Panadol Extra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-b089-49e17922xxq",
          description: "Mephenesin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1be6uqcd-7704-4250-b089-49e17922kdy", 
          description: "Cao dán Salonpas",
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
