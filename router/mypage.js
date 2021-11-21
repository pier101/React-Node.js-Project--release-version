const express = require("express");
const User = require('../models/user');
const Feed = require('../models/feed')
const Follow = require('../models/follow');
const ArtistCard = require("../models/artistcard");

const router = express.Router();


router.get('/:id',async(req,res)=>{
    const id = req.params.id
    await User.findOne({where: {userId: id} }).then(data=>res.send(data))
})
router.get('/feed/:id',async(req,res)=>{
    const id = req.params.id
    await Feed.findAll({where: {userId : id}}).then(data=>{
        console.log(data)
        res.send(data)})
})
router.get('/followlist/:id',async(req,res)=>{
    const id = req.params.id
    await Follow.findAll({
        include:[{
            model:ArtistCard,
            attributes:["artistCardImg"]
        }],
        where: {userId : id}}).then(data=>res.json(data)).catch(err=>console.error(err))
})

router.post("/:name/follow/delete", async (req,res)=>{
    try{
        const {name} = req.params
        const {id}= req.body;
        await Follow.destroy({
            where:{
                userId: id,
                artistName:name
            }
        })

        await Follow.findAll({
            where: {userId: id}    
        }).then(data=>res.json(data))
    }  catch (err) {
        console.error(err);
    }
})

module.exports = router;