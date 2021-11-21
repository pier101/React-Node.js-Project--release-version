'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    
    let obj1={
      artistCardNum: 1,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg",
      artistName: "CL"
    }
    datas.push(obj1);
    
    let obj2={
      artistCardNum: 2,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/122262f1689046e7b47f568a3f5c1765066.png",
      artistName: "WINNER"
    }
    datas.push(obj2);

    let obj3={
      artistCardNum: 3,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/f59ff76e6908409ea9bb7e4f162c7615633.png",
      artistName: "SUNMI"
    }
    datas.push(obj3);
    
    let obj4={
      artistCardNum: 4,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/cb2d1cb18dd7460cb9c2960d05d8250e312.png",
      artistName: "Cherry Bullet"
    }
    datas.push(obj4);
      
    let obj5={
      artistCardNum: 5,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/ac7607c8e3274fc9aee450bffec0a33e273.png",
      artistName: "BTS"
    }
    datas.push(obj5);
      
    let obj6={
      artistCardNum: 6,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/9748dae239044e65835bd894768beebe971.png",
      artistName: "BLACKPINK"
    }
    datas.push(obj6);
      
    let obj7={
      artistCardNum: 7,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/090722d7ca2a47788259daae9fcee816113.png",
      artistName: "PURPLE KISS"
    }
    datas.push(obj7);
      
    let obj8={
      artistCardNum: 8,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/2e83550447b24694b6b56a50af69dbae696.png",
      artistName: "STAYC"
    }
    datas.push(obj8);
      
    let obj9={
      artistCardNum: 9,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/346c57cc115f4a128b664e2ef8c6204a919.png",
      artistName: "ICON"
    }
    datas.push(obj9);
      
    let obj10={
      artistCardNum: 10,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/6f507fa2f1494fa890dcebfa4fad0679055.png",
      artistName: "EVERGLOW"
    }
    datas.push(obj10);
      
    let obj11={
      artistCardNum: 11,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/0d1c0a2d47b24cbe88d3e37ef41e1048379.png",
      artistName: "FTISLAND"
    }
    datas.push(obj11);
      
    let obj12={
      artistCardNum: 12,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/820ec79f5efe4f219b3ba007d7536bff191.png",
      artistName: "Dreamcatcher"
    }
    datas.push(obj12);
      
    let obj13={
      artistCardNum: 13,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/9949763892a0487a943f0649cb317b1b974.png",
      artistName: "HENRY"
    }
    datas.push(obj13);
      
    let obj14={
      artistCardNum: 14,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/aadd97a356ab4f02b1542be720cc1f39022.png",
      artistName: "Weeekly"
    }
    datas.push(obj14);
      
    let obj15={
      artistCardNum: 15,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/png/12529b280a424913b549ac2f73f00d28081.png",
      artistName: "GFRIEND"
    }
    datas.push(obj15);
      
    let obj16={
      artistCardNum: 16,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/jpg/00c10d7818da41788c33b014346fda17312.jpg",
      artistName: "SEVENTEEN"
    }
    datas.push(obj16);
    return queryInterface.bulkInsert("artistCards", datas, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
