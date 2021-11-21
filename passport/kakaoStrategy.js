const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: "/auth/kakao/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("kakao profile", profile);
                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: "kakao" },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            userId: profile.username,
                            userPwd: profile.id,
                            userName: profile.username,
                            userTel: profile.id,
                            userMail: profile.username,
                            userAddr: profile.id,
                            snsId: profile.id,
                            provider: "kakao",
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
