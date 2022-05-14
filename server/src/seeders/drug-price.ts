const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DrugPrices",
      [
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793htva",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793aqxl",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 280000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793okmj",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          price: 90000,
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793kjhg",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          price: 8000,
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793oqaz",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793mnbc",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4c556d9c-045c-4043-817b-9bb487510ff8",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4c556d9c-045c-4043-817b-9bb487510ii9",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", 
          price: 60000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mhkjq",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 12000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079okoko",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 390000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07972601",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mhtfl",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 7000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079oklko",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mnhj2",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//

        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793oqaa",
          drugId: "1be640cd-7704-4250-a089-49e172c04df4",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 230000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mhttt",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 6000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079okako",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 190000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mnhj9",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 38000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079uytfd",
          drugId: "1be6uqcd-7704-4250-a089-49e172c04doo",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079plqay",
          drugId: "1be6uqcd-7704-4250-a089-49e172c04doo",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 320000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mnhpp",
          drugId: "1be6uqcd-7704-4250-a089-49e172c04doo",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 88000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0793oqbb",
          drugId: "1be6uqcd-7704-4250-a089-49e172c7381",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 20000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079wwwaa",
          drugId: "1be6uqcd-7704-4250-a089-49e172c7381",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 270000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079pytxc",
          drugId: "1be6uqcd-7704-4250-a089-49e1727ye3a",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079htgbb",
          drugId: "1be6uqcd-7704-4250-a089-49e1727ye3a",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 340000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079kfgqo",
          drugId: "1be6uqcd-7704-4250-a089-49e172kyggf",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079plpli",
          drugId: "1be6uqcd-7704-4250-a089-49e172kyggf",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 280000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079uytss",
          drugId: "1be6uqcd-7704-4250-a089-49e17977721",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 70000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07999qay",
          drugId: "1be6uqcd-7704-4250-a089-49e17977721",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 450000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mnppp",
          drugId: "1be6uqcd-7704-4250-a089-49e17977721",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 68000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "9b8c6d95-77ab-4fec-0000-df5d079plpli",
          drugId: "1be6uqcd-7704-4250-a089-49e17900000",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-1111-df5d079uytss",
          drugId: "1be6uqcd-7704-4250-a089-49e17900000",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 4000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-1234-df5d079htgbb",
          drugId: "1be6uqcd-7704-4250-a089-49e17900999",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 190000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-4567-df5d079kfgqo",
          drugId: "1be6uqcd-7704-4250-a089-49e17900999",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 11000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07990ooo",
          drugId: "1be6uqcd-7704-4250-a089-49e17911111",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 130000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07779qiy",
          drugId: "1be6uqcd-7704-4250-a089-49e17911111",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaad3e3ogq", //miếng
          price: 15000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07990qay",
          drugId: "1be6uqcd-7704-4250-b089-49e17922xxq",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07999qiy",
          drugId: "1be6uqcd-7704-4250-b089-49e17922xxq",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaad3e3ogq", //miếng
          price: 21000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0799pphy",
          drugId: "1be6uqcd-7704-4250-b089-49e17922kdy",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d0799htzy",
          drugId: "1be6uqcd-7704-4250-b089-49e17922kdy",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaad3e3ogq", //miếng
          price: 34000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079u99ss",
          drugId: "1be6uqcd-7704-4250-a089-49e17922222",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d07964qay",
          drugId: "1be6uqcd-7704-4250-a089-49e17922222",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 490000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9b8c6d95-77ab-4fec-9cf3-df5d079mnmkp",
          drugId: "1be6uqcd-7704-4250-a089-49e17922222",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DrugPrices", null, {});
  },
};
