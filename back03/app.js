const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const cors = require('cors');

dotenv.config();

// console.log(process.env.AA);
// console.log(process.env.BB);

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));

// 로그남기기
app.use(morgan('dev'));
// public에 있는거 요청했을경우 응답해주기
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // req.body 확인
app.use(express.urlencoded({extended: false})); // req.query 확인
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
    },
    name: "session-cookie"
}))

app.set('port', 4000);

app.post('/login', (req, res,next) => {
    console.log(req.body);
    const {email, password} = req.body;
    if (email === "aaa@naver.com" && password === "1234") {
        req.session.user = {email}
        res.send("로그인 성공");
    } else {
        res.send("로그인 실패 eamil password 확인하세요");
    }
});

app.get("/mypage" , (req, res,next) => {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.send("로그인안되어있음")
    }
});

app.get("/logout", (req, res,next) => {
    req.session.destroy((err) => {
        if (err){
            return res.status(500).send("세션삭제실패");
        }
        res.clearCookie("session-cookie");
        res.send("로그아웃되었습니다.");
    });
})

app.post("/setSession", (req, res, next) => {
    req.session.userName = "홍길동";
    req.session.loggedIn = true;
    res.send("세션 설정 완료");
});

app.get("/getSession", (req, res,next) => {
    console.log(req.session);
    console.log(req.session.userName);
    console.log(req.session.loggedIn);
    res.send("세션 가져오기");
});

app.get("/destroySession", (req, res,next) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("세션 삭제 실패");
        }
        res.clearCookie("session-cookie");
        res.send("세션 삭제 완료");
    });
})

app.get("/setCookie", (req, res, next) => {
    res.cookie("haha", "hoho", {
        expires: new Date(Date.now() + 1000 * 60),
    });
    res.cookie("signhaha", "hoho", {signed: true});
    res.send("쿠키설정");
});

app.get('/getCookie', (req, res, next) => {
    console.log(req.cookies);
    res.send("쿠키확인");
});

app.get("/", (req, res, next) => {
    console.log(req.body);
    console.log("/경로 요청");
    res.send("성공");
});

app.get("/html", (req, res, next) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
})

app.listen(app.get('port'), () => {
    console.log("서버 4000시작");
});