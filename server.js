const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const dotenv = require("dotenv");

const pageRouter = require("./router/page.js");
const artistRouter = require('./router/artist')
const authRouter = require('./router/auth')
const mypageRouter = require('./router/mypage')
const Artistcards = require('./models/artistcard')
const boardRouter = require("./router/board");
const adminRouter = require('./router/admin')
const goodsRouter = require('./router/goods')
const session = require('express-session');
const Goods = require("./models/goods");
const OrderGoods = require("./models/orderGoods");

const FileStore = require('session-file-store')(session);
const fs  = require('fs')
const path = require('path')
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, 
};


dotenv.config();
const app = express();
sequelize
.sync({ force: false })
.then(() => {
  console.log("데이터베이스 연결 성공");
})
.catch((err) => {
  console.error(err);
});

app.use(cors(corsOptions));
app.use('/img',express.static(path.join(__dirname,'uploads')))
app.use(express.urlencoded({
  limit:"5mb",
  extended: true}));
  app.use(express.json({limit:"5mb"}));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  }));
  /* secret : 암호 키 저장, 이 키를 통하여 Session id를 암호화한다.
    resave :  재저장을 계속 할 것인지 정보, 세션에 변화가 없어도 계속 저장한다는 옵션이다.(false 권장)
    saveUninitialized : True일 경우 세션 저장 전 unitialized 상태로 미리 저장한다
    store : 세션 데이터의 저장소 설정 (위 코드에서는 mongoose-session을 통하여 MongoDB에 저장)
    cookie { maxAge } : 세션 저장 만료 시간 설정 (위 예제에서는 24시간으로 설정)
*/
  
  app.use("/", pageRouter);
  app.use('/artist', artistRouter)
  app.use('/auth', authRouter)
  app.use("/mypage", mypageRouter)
  app.use("/board", boardRouter);
  app.use('/admin', adminRouter)
  app.use('/goods', goodsRouter)
  
  
  
////////main 페이지 아티스트카드 불러올꺼
app.get('/artistCard', async (req, res, next) => {
  try {
        
      res.send( await Artistcards.findAll() );
  } catch (err) {
      next(err);
  }
  });

    //////////shop 페이지 구즈카드
app.get('/goodsCard', async (req, res, next) => {
  try {
  const goodsCard= await Goods.findAll(
    { include: {model: Artistcards}
  })
    res.json(goodsCard);
  } catch (err) {
      next(err);
  }
});
/////오더굿즈
app.post("/goodsOder",async (req, res) => {
  
  const {buy_count,
        goods_color,
        goods_size,
        buyer_hp,
        buyer_address,
        buyer_email,
        goodsNum,
        userId} = req.body.content;
  try {
      await OrderGoods.create({
        orderQty:buy_count,
        goods_color,
        goods_size,
        buyer_hp,
        buyer_address,
        buyer_email,
        goodsNum,
        userId,
      });
      return res.send({ data:'성공' });
  } catch (err) {
      console.error(err);
  }
});
  //////////////////////////////////////////네이버 검색 api
  var client_id = 'WBUTkxSJHkAOIVSM0i78';
  var client_secret = 'tS6kxuYMb1';
  app.get('/search', function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/image?query=' + encodeURI(req.query.query); // json 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) { 
      if (!error && response.statusCode == 200) {
        res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        res.end(body);
      
      } else {
        res.status(response.statusCode).end();
        console.log('error = ' + response.statusCode);
      }
    });
  });


const port = 5000;
app.listen(port, () => {
  console.log(`${port}번 포트에 연결`);
});

