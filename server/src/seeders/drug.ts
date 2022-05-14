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
          id: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          description: "Clorpheniramin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b427bda-d35a-11ec-9d64-0242ac120002",
          description: "Hadocolcen",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "d940815c-d35a-11ec-9d64-0242ac120002",
          description: "Cottuf",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0ef8dca4-d35b-11ec-9d64-0242ac120002",
          description: "Nostravin", //thuốc nhỏ mũi, 1 – 2 giọt/ lần
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4be6890e-d35b-11ec-9d64-0242ac120002",
          description: "Pseudoephedrine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "74892a38-d35b-11ec-9d64-0242ac120002",
          description: "Dextromethorphan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9e80894e-d35b-11ec-9d64-0242ac120002",
          description: "Eucalyptine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c8b1f4dc-d35b-11ec-9d64-0242ac120002",
          description: "Pholcodine",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          description: "Panadol Extra",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2a1de6ea-d35c-11ec-9d64-0242ac120002",
          description: "Mephenesin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "432e79c4-d35c-11ec-9d64-0242ac120002", 
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
