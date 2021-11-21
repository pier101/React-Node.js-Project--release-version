const Sequelize = require("sequelize");

const Admin = require("./admin");
const Artist = require("./artist");
const ArtistCard = require("./artistcard");
const Comment = require("./comment");
const Feed = require("./feed");
const ArtistFeed = require("./artistfeed ");
const Goods = require("./goods");
const GoodsComment = require("./goodscomment");
const OrderGoods = require("./orderGoods");
const ThumbsUp = require("./thumbsup");
const User = require("./user");
const Follow = require('./follow')
const Image = require('./image')
const Board = require("./board");
const WishList = require("./wishlist");
// const FollowList = require('./followlist')

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,

  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASS,
  {
    host: process.env.MYSQL_URL,
    dialect: "mysql",
    timezone: "+09:00", // DB에 저장할 때 시간 설정
    dialectOptions: {
      timezone: "+09:00", // DB에서 가져올 때 시간 설정
    },
    define: {
      timestamps: false,
      supportBigNumbers: true,
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Admin = Admin;
db.Artist = Artist;
db.ArtistCard = ArtistCard;
db.Comment = Comment;
db.Feed = Feed;
db.ArtistFeed = ArtistFeed;
db.Goods = Goods;
db.GoodsComment = GoodsComment;
db.OrderGoods = OrderGoods;
db.ThumbsUp = ThumbsUp;
db.User = User;
db.Follow = Follow;
db.Image = Image;
db.Board = Board;
db.WishList = WishList;

// db.FollowList = FollowList;

Admin.init(sequelize);
Artist.init(sequelize);
ArtistCard.init(sequelize);
Comment.init(sequelize);
Feed.init(sequelize);
ArtistFeed.init(sequelize);
Goods.init(sequelize);
GoodsComment.init(sequelize);
OrderGoods.init(sequelize);
ThumbsUp.init(sequelize);
User.init(sequelize);
Follow.init(sequelize);
Image.init(sequelize);
Board.init(sequelize);
WishList.init(sequelize);

// FollowList.init(sequelize);

Admin.associate(db);
Artist.associate(db);
ArtistCard.associate(db);
Comment.associate(db);
Feed.associate(db);
ArtistFeed.associate(db);
Goods.associate(db);
GoodsComment.associate(db);
OrderGoods.associate(db);
ThumbsUp.associate(db);
User.associate(db);
Follow.associate(db);
Image.associate(db);
Board.associate(db);
WishList.associate(db);
// FollowList.associate(db);

module.exports = db;

// Oclass.prototype.dateFormat = (date) => {
//     moment(date).format("YYYY년 MM월 DD일");
// };
