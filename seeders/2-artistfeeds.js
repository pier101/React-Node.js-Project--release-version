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
    artistFeedNum : 1,
    artistfeedContent : "이번 신곡 기대하세요!",
    artistfeedImg: "https://www.rollingstone.com/wp-content/uploads/2021/05/BTS_Butter-photo-Enhanced.jpg?resize=1800,1200&w=1200",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "RM",
  }
  datas.push(feed1);
  let feed2 ={
    artistFeedNum : 2,
    artistfeedContent : "호비 짐싸러가용 😇😊🥰  오늘도 굿 나잇🥰😍🤩 추억의 백발😅",
    artistfeedImg: "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/1a2ab9ca9f984bebb931515af87f9616299.jpg",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "hobi",
  }
  datas.push(feed2);
  let feed3 ={
    artistFeedNum : 3,
    artistfeedContent : "밤이 어릴때 내가 키웠다",
    artistfeedImg: "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/d36ee1e5e529452ab915ae4fd7c5d09b780.jpg",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "V",
  }
  datas.push(feed3);
  let feed4 ={
    artistFeedNum : 4,
    artistfeedContent : "여러분 굿밤 되세요~~~~~~~",
    artistfeedImg: null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "지민",
  }
  datas.push(feed4);
  let feed5 ={
    artistFeedNum : 5,
    artistfeedContent : "내일 드디어 지미 팰런쇼 촬영!!",
    artistfeedImg: null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "RM",
  }
  datas.push(feed5);
  let feed6 ={
    artistFeedNum : 6,
    artistfeedContent : "굿모닝",
    artistfeedImg: null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "hobi",
  }
  datas.push(feed6);
  let feed7 ={
    artistFeedNum : 7,
    artistfeedContent : "에피파니 옛날 버전.. 전혀 다른노래임ㅋㅋ",
    artistfeedImg : "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/fb19e91b7641432e834b4a3e2071982d776.jpg",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "V",
  }
  datas.push(feed7);
  let feed8 ={
    artistFeedNum : 8,
    artistfeedContent : "오늘하루 어떠셨나요?",
    artistfeedImg : null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "지민",
  }
  datas.push(feed8);
  let feed9 ={
    artistFeedNum : 9,
    artistfeedContent : "오늘하루 어떠셨나요?",
    artistfeedImg : null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "RM",
  }
  datas.push(feed9);
  let feed10 ={
    artistFeedNum : 10,
    artistfeedContent : "오늘하루 어떠셨나요?",
    artistfeedImg : null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "지민",
  }
  datas.push(feed10);
  let feed11 ={
    artistFeedNum : 11,
    artistfeedContent : "퇴근",
    artistfeedImg : "https://cdn-contents-web.weverse.io/user/xlx2048/jpg/3c5db50035034539a587bb9d21f00387688.jpg",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "진",
  }
  datas.push(feed11);
  let feed12 ={
    artistFeedNum : 12,
    artistfeedContent : "지리산 ost 녹음할 때 찍은 거",
    artistfeedImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRK1tffawOyMif4xsoalbJRpyiFceavicRrw&usqp=CAU",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "진",
  }
  datas.push(feed12);
  let feed13 ={
    artistFeedNum : 13,
    artistfeedContent : "하하하하하하하하하핳하하하",
    artistfeedImg : "https://www.geo.tv/assets/uploads/updates/2021-06-08/353981_773317_updates.jpg",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "V",
  }
  datas.push(feed13);
  let feed14 ={
    artistFeedNum : 14,
    artistfeedContent : "오징어 겜 존잼",
    artistfeedImg : "https://img.insight.co.kr/static/2021/08/26/700/img_20210826085626_7u6y0dv6.webp",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "지민",
  }
  datas.push(feed14);
  let feed15 ={
    artistFeedNum : 15,
    artistfeedContent : "hello world",
    artistfeedImg : "https://thumb.mt.co.kr/06/2021/10/2021100121353082926_1.jpg/dims/optimize/",
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "진",
  }
  datas.push(feed15);
  let feed16 ={
    artistFeedNum : 16,
    artistfeedContent : "굿보이",
    artistfeedImg : null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "hobi",
  }
  datas.push(feed16);
  let feed17 ={
    artistFeedNum : 17,
    artistfeedContent : "반갑습니다",
    artistfeedImg : null,
    artistfeedCreated : Sequelize.literal("current_timestamp"),
    artistName : "BTS",
    userId : "진",
  }
  datas.push(feed17);
  
  return queryInterface.bulkInsert("aritstfeeds", datas, {});
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