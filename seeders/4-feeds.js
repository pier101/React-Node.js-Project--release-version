'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  let datas = [];
  let feed1 ={
    feedNum : 1,
    feedContent : "이번 신곡 대박💜",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "dongwook12",
  }
  datas.push(feed1);
  let feed2 ={
    feedNum : 2,
    feedContent : "지금 뭐하세요? 🍒",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "rara12",
  }
  datas.push(feed2);
  let feed3 ={
    feedNum : 3,
    feedContent : "2집 앨범 구해요 ㅠㅠ 간절합니다😥😥",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "haemin12",
  }
  datas.push(feed3);
  let feed4 ={
    feedNum : 4,
    feedContent : "이번 단콘 가시는 분 없으신가요~~~???",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "soon12",
  }
  datas.push(feed4);
  let feed5 ={
    feedNum : 5,
    feedContent : "안녕히 주무세요!! 식사 하셨나요? 잘 먹고 특히 이 시대에 우리 모두 건강하는 것이 중요합니다😊❤",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "dongwook12",
  }
  datas.push(feed5);
  let feed6 ={
    feedNum : 6,
    feedContent : "강릉 놀러왔는데 완전 조아요 강추강추 횐님들도 이 시기에 함 가보세요~",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "soon12",
  }
  datas.push(feed6);
  
  return queryInterface.bulkInsert("feeds", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
