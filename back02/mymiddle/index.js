module.exports = function (req, res, next) {
    console.log("미들웨어");
    next();
};

// 모든요청은 req.user 로그인되어있으면 next();
// 없으면 res.send(로그인하셔야 합니다.)