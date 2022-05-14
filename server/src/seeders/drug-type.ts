module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "DrugTypes",
      [
        {
          id: "44bda663-6ca0-4e79-9a89-dfbe09649586",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "bc4c95d0-7455-4758-8449-f805e1011c22",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5b00ca73-d33b-4077-ba2e-c87a8c67c884",
          drugId: "6bd89381-afaf-40e3-8ef3-2282825ab06d",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1180e91c-26ab-4902-b432-492c4d975347",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2f843d18-88c3-4d73-87f1-965723532809",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "9a299f77-aea3-4177-a159-6ab97ae851d3",
          drugId: "1be640cd-7704-4250-a089-49e172c04df3",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a9e4b873-6b42-4d06-a170-0663c1bc9435",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4afdf598-adde-40cc-ad18-a90b080bc46c",
          drugId: "da0278e2-8e28-4a38-9144-82c00c91c20f",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "8b7d9f1d-e223-4b0a-8c06-7a1cfb6f30c8",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "74fecd86-dfba-4608-8d45-33a95774ed94",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5783d743-07d7-45dc-bfe3-c461c3bca77a",
          drugId: "1d866fa7-f6db-4eef-bc54-612eeeefd70e",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0b2e1e2e-14f4-4b37-b216-6f115e0accd2",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c2ad1558-f0ae-4d8f-985b-1a005e1410f3",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2526c08e-199b-40e8-97fc-57ca4e90f0c8",
          drugId: "1be640cd-7704-4250-a089-49e172c04df2",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },//

        {
          id: "e38ce5e7-0e04-4357-ac8d-dde99a525feb",
          drugId: "1be640cd-7704-4250-a089-49e172c04df4",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0ad0ffa9-e0e2-4302-a08b-ace5998e6ea6",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1d99ea2c-0c2e-4fd2-aab5-7a96553d1d67",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ae20fee8-f9c9-4c87-b0bf-f2021d8a5735",
          drugId: "1be640cd-7704-4250-a089-49e172c04df5",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "f2bd5203-0f0a-4b0b-9ab9-754296c7573b",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "95152c73-d980-4736-bb6f-32b3349dad83",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3e8d5695-6edc-4ee0-b1c8-396794a1588b",
          drugId: "51a00d1c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "20d4a6e2-8f7a-4cc7-bac6-79d4da025aae",
          drugId: "9b427bda-d35a-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "f63600c3-f74a-4dd4-b276-277ac02d0368",
          drugId: "9b427bda-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "42dd3784-032e-4633-8183-b5ce3a407386",
          drugId: "d940815c-d35a-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4389d9c0-f2ee-4eba-bb7a-2c1133f22158",
          drugId: "d940815c-d35a-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "347fe451-8288-4afd-9394-4ec97cdb2417",
          drugId: "0ef8dca4-d35b-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "602f858f-2e2b-4bbc-ba44-846bf3c1f4e2",
          drugId: "0ef8dca4-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6acae129-36c2-4772-9ccd-b6581dd385fd",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4cd19478-6fb7-4715-941e-77bcd0cfcf48",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "00a3b947-3014-4d7f-b052-5dcfbf8e8e42",
          drugId: "4be6890e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
        {
          id: "d00b62f5-349c-4a05-a3a3-990942ef8462",
          drugId: "74892a38-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ec085f54-d3b7-401e-a99f-71538ff0bf05",
          drugId: "74892a38-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ef74bfb0-525a-4c4e-a68c-2b0e5fbfab1f",
          drugId: "9e80894e-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa99", //chai
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1c1b727e-4ef8-48fc-8076-c19472ac5706",
          drugId: "9e80894e-d35b-11ec-9d64-0242ac120002",
          unitId: "6bd89381-afaf-40e3-8ef3-2282825ab06c", //ml
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3d0bcc43-454a-42f5-bce5-36abce5d198c",
          drugId: "c8b1f4dc-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "ea642094-e5c6-4676-895e-572d535ecd87",
          drugId: "c8b1f4dc-d35b-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "1cc13d2a-5758-4838-a690-8977f8caf65b",
          drugId: "2a1de6ea-d35c-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "0d1775cc-c69e-436a-8149-b1ac630b2ef9",
          drugId: "2a1de6ea-d35c-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dcbf05ff-45be-457b-94cf-f74b90dba147",
          drugId: "432e79c4-d35c-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "40a828cf-3e32-4fc7-a235-b55e247c18a0",
          drugId: "432e79c4-d35c-11ec-9d64-0242ac120002",
          unitId: "ff760df2-d359-11ec-9d64-0242ac120002", //miếng
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "a6a8156b-0f3f-4793-bf78-8f24bc1a827a",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e3aa67", //viên
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "dba2feca-e7dc-4f64-b661-ac527d0c3931",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-30a9d3e77777", //hộp
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "c586575a-faa7-4fc4-a991-d999d2a66f0f",
          drugId: "fb71bb14-d35b-11ec-9d64-0242ac120002",
          unitId: "33a01aa9-5730-44b9-a5ec-aaaa0003aa99", //vỉ
          createdAt: new Date(),
          updatedAt: new Date(),
        },//
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("DrugTypes", null, {});
  },
};
