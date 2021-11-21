const express = require("express");
const router = express.Router();
const ArtistCard = require("../models/artistcard");
const Goods = require("../models/goods");
const OrderGoods = require("../models/orderGoods");

router.post("/atistcard",async (req, res) => {
    const {artistName, artistCardImg } = req.body.cardContent;
    try {
        const exName = await ArtistCard.findOne({ where: { artistName } });    //아이디 중복확인
        if (exName) {
            return res.send({ data:true });
        }
        await ArtistCard.create({
            artistName,
            artistCardImg,
        });
        return res.send({ data: false });
    } catch (err) {
        console.error(err);
    }
  });

router.post("/goods",async (req, res) => {
    const {artistName,goodsName,goodsPrice,goodsContent } = req.body.Content;
    console.log("만들기")
    try {
        const checkName = await Goods.findOne({ where: { goodsName } });    //상품 중복확인
        if (checkName) {
            return res.send({ data:true });
        }
        await Goods.create({
            artistName,
            goodsName,
            goodsPrice,
            goodsContent,
            
        });
        return res.send({ data: false });
    } catch (err) {
        console.error(err);
    }
  });
  ///////배송지 불러오기
  router.get('/goodsCard', async (req, res, next) => {
    try {
    const goodsCard= await OrderGoods.findAll(
      { include: {model: Goods}}
      )
    
      res.send( goodsCard);
    } catch (err) {
        next(err);
    }
  });


module.exports = router;