const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DrugPrices",
      [
        {
          id: "44bda663-6ca0-4e79-9a89-dfbe09649586",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bc4c95d0-7455-4758-8449-f805e1011c22",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 280000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f0ef04ed-c99d-445f-83cb-7523698bc1b8",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          price: 90000,
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "226b8517-3db1-4b5b-91d4-2f162079d3e2",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          price: 8000,
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5b00ca73-d33b-4077-ba2e-c87a8c67c884",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b379eeff-abd3-4b3d-aff5-d1219b174049",
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
          id: "4afdf598-adde-40cc-ad18-a90b080bc46c",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", 
          price: 60000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8b7d9f1d-e223-4b0a-8c06-7a1cfb6f30c8",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 12000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "74fecd86-dfba-4608-8d45-33a95774ed94",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 390000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1b4b990e-fb64-4306-bebf-789bcbde470b",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 100000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0b2e1e2e-14f4-4b37-b216-6f115e0accd2",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 7000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "443767a0-55e0-4cf2-a6b7-6daa400a338b",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2526c08e-199b-40e8-97fc-57ca4e90f0c8",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 40000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//

        {
          id: "56bffa48-5007-4674-b6dd-3304fcca8552",
          drugId: "1be640cd-7704-4250-a089-49e172c04df4",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 230000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "aa2f19ed-c6c7-4ec9-8c64-dc40cf098c3b",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 6000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4c3b3d1c-1e75-46ad-9894-65621dec5987",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 190000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dbedb388-5ef6-4f38-bb2b-38580ce616d8",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 38000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "d71eea69-ca65-46ae-aaac-3f5018ae3c70",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "424350e9-8eda-4e6c-8e4a-83d174b964ce",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 320000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f8d4f852-76da-49be-ab58-765f7f345fca",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 88000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "e38ce5e7-0e04-4357-ac8d-dde99a525feb",
          drugId: "9b427bda-d35a-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 20000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1d99ea2c-0c2e-4fd2-aab5-7a96553d1d67",
          drugId: "9b427bda-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 270000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ae20fee8-f9c9-4c87-b0bf-f2021d8a5735",
          drugId: "d940815c-d35a-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 30000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cb75144a-80a4-4924-9b93-51ff7e9f430d",
          drugId: "d940815c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 340000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "95152c73-d980-4736-bb6f-32b3349dad83",
          drugId: "0ef8dca4-d35b-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "20d4a6e2-8f7a-4cc7-bac6-79d4da025aae",
          drugId: "0ef8dca4-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 280000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f63600c3-f74a-4dd4-b276-277ac02d0368",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 70000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "602f858f-2e2b-4bbc-ba44-846bf3c1f4e2",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 450000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6acae129-36c2-4772-9ccd-b6581dd385fd",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          price: 68000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "4cd19478-6fb7-4715-941e-77bcd0cfcf48",
          drugId: "74892a38-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "00a3b947-3014-4d7f-b052-5dcfbf8e8e42",
          drugId: "74892a38-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 4000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ec085f54-d3b7-401e-a99f-71538ff0bf05",
          drugId: "9e80894e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          price: 190000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "b148a5b3-78cb-43f8-a35e-a29cd116297e",
          drugId: "9e80894e-d35b-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          price: 11000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1c1b727e-4ef8-48fc-8076-c19472ac5706",
          drugId: "c8b1f4dc-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 130000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3d0bcc43-454a-42f5-bce5-36abce5d198c",
          drugId: "c8b1f4dc-d35b-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          price: 15000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ea642094-e5c6-4676-895e-572d535ecd87",
          drugId: "2a1de6ea-d35c-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 200000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "883bf1de-c2a4-42fd-adae-43da43673e44",
          drugId: "2a1de6ea-d35c-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          price: 21000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dcbf05ff-45be-457b-94cf-f74b90dba147",
          drugId: "432e79c4-d35c-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 300000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "40a828cf-3e32-4fc7-a235-b55e247c18a0",
          drugId: "432e79c4-d35c-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          price: 34000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1664efa4-298e-452f-92c6-c21282e53cbf",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          price: 10000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e1f5e485-4ac7-499a-b467-fc4de4d558d3",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          price: 490000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "55547a72-f123-4819-a243-b90cab8a63f2",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
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
