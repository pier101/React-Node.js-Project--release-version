'use strict';

const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];

    const hash = await bcrypt.hash("1234", 12);

    let obj = {
        userId: "dongwook12",
        userPwd: hash,
        userName: "김동욱",
        userTel: "010-1234-4567",
        userMail: "onedayclasstest@gmail.com",
        userAddr: "경기도 수원시",
        userImg: "https://img.etoday.co.kr/pto_db/2017/12/20171207101020_1161387_600_462.jpg",
        role: "artist",
        provider: "local"
    };
    datas.push(obj);

    const hash2 = await bcrypt.hash("1234", 12);
    let obj2 = {
        userId: "haemin12",
        userPwd: hash2,
        userName: "박해민",
        userTel: "010-4567-4567",
        userMail: "bhm@naver.com",
        userAddr: "서울시 강동구 천호 어딘가 쉐어하우스",
        userImg: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/958/483fc9d28dc81b59e1902e5c57ae1fcf_res.jpeg",
        role: "user",
        provider: "local"
    };
    datas.push(obj2);

    const hash3 = await bcrypt.hash("1234", 12);
    let obj3 = {
        userId: "soon12",
        userPwd: hash3,
        userName: "임철순",
        userTel: "010-9874-6541",
        userMail: "lcs@naver.com",
        userAddr: "서울시 강동구 천호 어딘가",
        userImg: "https://t1.daumcdn.net/cfile/tistory/992D094B5BC2E61935",
        role: "user",
        provider: "local"
    };
    datas.push(obj3);

    const hash4 = await bcrypt.hash("1234", 12);
    let obj4 = {
        userId: "rara12",
        userPwd: hash4,
        userName: "장아라",
        userTel: "010-4561-2876",
        userMail: "kakao@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://cdn.ppomppu.co.kr/zboard/data3/2020/1011/20201011222743_lindqurz.jpg",
        role: "user",
        provider: "local"
    };
    datas.push(obj4);
    let obj5 = {
        userId: "hobi",
        userPwd: hash4,
        userName: "호비",
        userTel: "010-4561-2876",
        userMail: "333232d@naver.com",
        userAddr: "서울시 강남구 ",
        userImg: "https://t1.daumcdn.net/cfile/tistory/99C6034F5ED0658B2A",
        role: "user",
        provider: "artist"
    };
    datas.push(obj5);
    let obj6 = {
        userId: "진",
        userPwd: hash4,
        userName: "진",
        userTel: "010-4561-2876",
        userMail: "kaka121o@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://image.fnnews.com/resource/media/image/2021/02/17/202102170838370110_l.jpg",
        role: "user",
        provider: "artist"
    };
    datas.push(obj6);
    let obj7 = {
        userId: "RM",
        userPwd: hash4,
        userName: "RM",
        userTel: "010-4561-2876",
        userMail: "kaddkao@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://ibighit.com/bts/images/bts/profile/member-rm.jpg",
        role: "user",
        provider: "artist"
    };
    datas.push(obj7);
    let obj8 = {
        userId: "뷔뷔",
        userPwd: hash4,
        userName: "뷔뷔",  
        userTel: "010-4561-2876",
        userMail: "kaksszao@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://thumbnews.nateimg.co.kr/view610///news.nateimg.co.kr/orgImg/tn/2021/06/12/2021061206150852079_1.jpg",
        role: "user",
        provider: "artist"
    };
    datas.push(obj8);
    let obj9 = {
        userId: "지민",
        userPwd: hash4,
        userName: "지민",
        userTel: "010-4561-2876",
        userMail: "kaksssao@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://dimg.donga.com/wps/NEWS/IMAGE/2021/09/11/109204456.2.jpg",
        role: "user",
        provider: "artist"
    };
    datas.push(obj9);


    return queryInterface.bulkInsert("users", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete("users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
