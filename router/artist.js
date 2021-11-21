const express = require("express");
const Feed = require("../models/feed");
const ArtistFeed = require("../models/artistfeed ");
const ArtistCard = require("../models/artistcard");
const Comment =require("../models/comment")
const Follow = require('../models/follow');
const User = require('../models/user');
const router = express.Router();



//아티스트카드 정보 클라이언트 전달
router.get('/card:name',async(req,res)=>{
    const name = req.params.name
    await ArtistCard.findOne({
        where: {artistName: name}
    }).then(data=>res.send(data))
})

//전체 게시글 클라이언트에게 전달해주는 라우터
router.get('/posts/:id',async(req,res,next)=>{
    const id = req.params.id

    await Feed.findAll({ 
        include:[{
            model:User,
            attributes:["userImg"]
            }],
        where:{artistName: id},
        order: [["feedNum", "DESC"]]})
    .then(result=>res.send(result))
    .catch(err=>{
        console.log(err) 
        throw err;
    });
});

  //게시글 생성
router.post("/posts/:name",async (req, res, next) => {
const {content,id} = req.body;
const name = req.params.name
console.log("유저게시물작성")
const isUser = await User.findOne({where:{
    userId: id
}})
console.log(isUser.role)
if(isUser.role ==="artist"){
    return res.send("이 공간에서는 유저분들만 글을 게시할 수 있어요😉")
}else if(isUser.role==="user"){
    await Feed.create({
        feedContent: content,  
        artistName: name,
        userId : id
    })

    await Feed.findAll({where:{
        artistName: name
    },order: [["feedNum", "DESC"]]
    }).then(data=>res.json(data))
    }
});

//아티스트 글 생성
router.post("/Aposts/:name", async(req, res, next) => {
const {content,id, img} = req.body;
const name = req.params.name
console.log("아티스트게시글작성")
console.log(content)
console.log(id)
console.log(name)



    const isUser = await User.findOne({where:{
        userId: id
    }})

    if(isUser.role ==="user"){
        return res.send("이 공간에서는 아티스트분들만 글을 게시할 수 있아요!")
    }else if(isUser.role==="artist"){
        await ArtistFeed.create({
                    artistfeedContent: content,  
                    artistName: name,
                    userId : id,
                    artistfeedImg: img[0]
        })
        await ArtistFeed.findAll({where:{
            artistName: name
        },order: [["artistFeedNum", "DESC"]]
        }).then(data=>{
            console.log(data)
            res.json(data)})
    }

    // .then((result) => {
    //     res.send(result)
    // })
    // .catch( err => {
    //     console.log(err)
    //     throw err;
    // })
});


//아티스트글 가져오기
router.get("/Aposts/:name", async(req, res, next) => {
const name = req.params.name
        await ArtistFeed.findAll({
            include:[{
                model:User,
                attributes:["userImg"]
            }],
            where:{artistName: name},
            order: [["artistFeedNum", "DESC"]]
        })
        .then(data=>res.json(data))
        .catch(err=>console.error(err))
    })

    // .then((result) => {
    //     res.send(result)
    // })
    // .catch( err => {
    //     console.log(err)
    //     throw err;
    // })

//게시글 삭제
router.post("/posts/:name/delete", async(req, res, next) => {
    try{
        const {feednum} = req.body;
        const name = req.params.name
    
        await Feed.destroy({where:{
            feedNum: feednum,
            artistName : name
        }})
        
        await Feed.findAll({where:{
            artistName : name
        }}).then(data=>res.json(data))
    } catch (err) {
        console.error(err);
    }
});
router.post("/posts/:name/deleteA", async(req, res, next) => {
    try{
        const {artistfeednum, id} = req.body;
        const name = req.params.name
    
        await ArtistFeed.destroy({where:{
            artistFeedNum: artistfeednum,
            artistName : name
        }})
        
        await ArtistFeed.findAll({where:{
            artistName : name
        }}).then(data=>{
            console.log(data)
            res.send(data)})
    } catch (err) {
        console.error(err);
    }
});

router.get("/artistinfo/:id",async(req,res,next)=>{

    const id = req.params.id
    await ArtistCard.findAll({
        where: {artistName: id}
    }).then(result=>res.send(result)).catch( err => {
        console.log(err)
        throw err;
    })
   // console.log(a)
})


//댓글 수정
router.post("/comment/:id/edit", async (req, res, next) => {
    const {comment, num} = req.body
    const id = req.params.id
    const editComment = await Comment.findOne({where: {commentNum : num}})
    if(editComment){
        await Comment.update({commentContent: comment},{where: {commentNum : num}})
        await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
    }
    
});



//댓글 등록
router.post("/comment", async (req, res) => {
    try {

        let { comment,id,feedNumber,name } = req.body;

        const commentData = await Comment.create({
            userId: id,
            commentContent: comment,
            artistName : name,
            feedNum: Number(feedNumber),
        })
        //json / send 보내는 방식 차이
        res.json(commentData)
    } catch (err) {
        console.error(err);

    }
});
//댓글 생성
router.get('/comment/:id',async (req,res)=>{
        const id = req.params.id
        console.log(id)
        
        await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
})

//아티스트피드 댓글 등록
router.post("/comment/artistfeed", async (req, res) => {
    try {
        let { comment,id,artistFeedNumber,name } = req.body;
        console.log('댓글생성')
        const commentData = await Comment.create({
            userId: id,
            commentContent: comment,
            artistName : name,
            artistFeedNum: Number(artistFeedNumber),
        })
        //json / send 보내는 방식 차이
        console.log("왔")
        console.log(commentData)
        res.send(commentData)
    } catch (err) {
        console.error(err);
        
    }
});
//댓글 생성
router.get('/comment/artistfeed/:id',async (req,res)=>{
        const id = req.params.id
        console.log(id)
        
        await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
})


//댓글 삭제
router.post("/comment/:id/delete", async (req, res) => {
    const {num} = req.body
    const id = req.params.id
    await Comment.destroy({
        where: { commentNum: req.body.num },
    })
    
    await Comment.findAll({where:{artistName: id}}).then(data=>res.send(data))
})



//팔로우 추가
router.post("/follow/:name", async (req,res)=>{
    try{
        const name = req.params.name
        const {id}= req.body;
        await Follow.create({
            userId: id,
            artistName:name
        })
        // await FollowList.create({
        //     followNum: 
        //     userId: id,
        //     artistName:name
        // })
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);
    }
})

//팔로우 취소
router.post("/unfollow/:name", async (req,res)=>{
    try{
        const name = req.params.name
        const {count,id}= req.body;
        console.log(count)
        await Follow.destroy({
            where:{
                userId: id,
                artistName:name
            }
        })
        // await FollowList.create({
        //     followNum: 
        //     userId: id,
        //     artistName:name
        // })
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);
    }
})
//마이페이지 내 팔로우 제거
router.post("/:name/follow/delete", async (req,res)=>{
    try{
        const name = req.params.name
        const {id}= req.body;
        await Follow.destroy({
            where:{
                userId: id,
                artistName:name
            }
        })

        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data))
    }  catch (err) {
        console.error(err);
    }
})
router.get("/followcounter/:name", async (req,res)=>{
    try{
        const name = req.params.name
        await Follow.findAll({
            where: {artistName: name}    
        }).then(data=>res.json(data.length))
    }  catch (err) {
        console.error(err);

    }
})



module.exports = router;

