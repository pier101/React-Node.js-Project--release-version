const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
// const Admin = require("../models/admin");
const User = require("../models/user");
const nodemailer = require("nodemailer");
require('dotenv').config()
const multer = require('multer');
const storage  = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './')},
    filename: function (req,file,cb) {
        const ext = file.mimetype.split('/')[1];
        cb(null,`uploads/${file.originalname}-${Date.now()}.${ext}`)
    }
})
const upload = multer ({
    storage: storage
})

const router = express.Router();

//여기서부터 user
router.post("/signup", async (req, res, next) => {
    const { id,pw2,name, email,tel,addr,addr2} = req.body;
    try {
        const isUserId = await User.findOne({ where: { userId: id } });
        const isUserMail = await User.findOne({ where: { userMail: email } });

        if (isUserId) {
            console.log('가입된 id가 있습니다.')
            return res.send("id존재")
        } else if(isUserMail) {
            console.log('가입된 email이 있습니다.')
            return res.send("email존재");
        } else{
            const hash = await bcrypt.hash(pw2, 12);
            await User.create({
                userId: id,
                userPwd: hash,
                userName: name,
                userMail: email,
                userTel: tel,
                userAddr: `${addr} ${addr2}`,
            });
            return res.send(true)
        }
    } catch (error) {
        console.error(error);
        return next(error);
    }
});


router.get('/logintest', (req, res) => {
    res.send({data: 'data'})
});
router.post('/logintest', async(req, res) => {
    const inputId =req.body.id
    const inputPw =req.body.pw
    const hash = await bcrypt.hash(inputPw, 12);
    console.log(hash)
    console.log(inputId)
    const userInfo = await User.findOne({where:{userId : inputId}})
    console.log(userInfo)
    const compare = await bcrypt.compare(inputPw,userInfo.userPwd)
    console.log(compare)
    if(compare=== true){
        console.log('성공')
        res.json(userInfo)
    } else{
        console.log('실패')
        res.send(false)
    }


});



router.post("/findpwdd", async (req, res, next) => {
    const { inputMail } = req.body;
    console.log(inputMail)
    try {
        const user = await User.findOne({
            // 1. 유저가 존재하면 유저 정보를 가져옴
            where: { userMail: inputMail },
        });
        console.log(user)
        //console.log(user);
        if (user) {
            // 2. 유저가 있다면?
            let arr =
                "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,!,@,#,$,%,&;".split(
                    ","
                );
                let newpwd = createCode(arr, 10);
                console.log(createCode(arr, 10));
                function createCode(objArr, iLength) {
                    let arr = objArr;
                    let randomStr = "";
                    for (let i = 0; i < iLength; i++) {
                    randomStr += arr[Math.floor(Math.random() * arr.length)];
                    }
                    return randomStr;
                }
                
            //임시비밀번호 생성 함수
        
            const transporter = nodemailer.createTransport({
                service: "gmail",
                port: 587,
                secure: true, // true for 465, false for other ports
                auth: {
                    // 이메일을 보낼 계정 데이터 입력
                    user: process.env.USERMAIL,
                    pass: process.env.USERPASS,
                    // .env에 따로 관리해야함
                },
            });

            const mailOptions = {
                from: process.env.USERMAIL, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                to: inputMail, // 수신 메일 주소
                subject: "[위버스]임시 비밀변호 발급", // 제목
                 // 내용
                html:
                `<p>비밀번호 분실 요청으로 임시비밀번호 발급드립니다.</p>`+
                    `<p>홈페이지에서 아래 임시비밀 번호로 로그인후 가급적이면 비밀번호를 변경해주세요.<p>` +
                    "<p>" +
                    '임시비밀번호 : '+
                    newpwd +
                    "</p>",
            };
            const hash = await bcrypt.hash(newpwd, 12);
            await User.update(
                {userPwd:hash},
                {where:{userId:"dongwook12"}},
                )

            console.log("업뎃왜안됨?")
            try {
                await transporter.verify();
                await transporter.sendMail(mailOptions);
                console.log("Email sent success!!!!");
            } catch (err) {
                console.error(err);
            }
        } //if절끝남

    } catch (e) {
        // try에서 result 결과값이 null일때 catch에서 에러로 잡지 않음 이유는?..
        console.error(e);
    }
});


router.delete("/:id/logout", (req, res) => {
    console.log('로그아웃')
    console.log(req.params.id)
    sessionStorage.removeItem('user_id')
    sessionStorage.clear();

});


router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect(`/`);
    }
);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect(`/`);
    }
);






module.exports = router;