const express = require("express");
const router = express.Router();
const controller = require("../controller");
const app = express();
const Board = require('../models/board')

router.post("/add/board", controller.add.board);

router.post("/get/board", controller.get.board);

router.post("/delete/board", async (req, res) => {
    try {
        const {data} = req.body;
         await Board.destroy({
            where: { board_id:data },
        });
    } catch (err) {
        console.error(err);
    }
});

router.get("/get/board_cnt", controller.get.board_cnt);



router.post('/get/board_data', async(req,res)=>{
    const {data} = req.body;
    console.log(data)
    console.log('왔어')
    await Board.findOne({where:{board_id:data}}).then(data=>res.send(data))


});

module.exports = router;
