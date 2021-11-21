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
    commentNum : 1,
    commentContent : "😍",
    commentCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "dongwook12",
    feedNum: null,
    artistFeedNum : 6,
  }
  datas.push(feed1);
  let feed2 ={
    commentNum : 2,
    commentContent : "여깃다 내 남자",
    commentCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "haemin12",
    feedNum: null,
    artistFeedNum : 6,
  }
  datas.push(feed2);
  let feed3 ={
    commentNum : 3,
    commentContent : "자전거 모델명 좀",
    commentCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "soon12",
    feedNum: null,
    artistFeedNum : 6,
  }
  datas.push(feed3);
  let feed4 ={
    commentNum : 4,
    commentContent : "헬멧 졸귕💜",
    commentCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "rara12",
    feedNum: null,
    artistFeedNum : 6,
  }
  datas.push(feed4);
  
  return queryInterface.bulkInsert("comments", datas, {});
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