const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');

dotenv.config();

// console.log(process.env.AA);
// console.log(process.env.BB);

const app = express();

// 로그남기기
app.use(morgan('combined'));
// public에 있는거 요청했을경우 응답해주기
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json()); // req.body 확인
app.use(express.urlencoded({ extended: false })); // req.query 확인

app.set('port', 4000);

app.post("/setCookie", (req, res, next) => {
    res.cookie("haha", "hoho");
    res.cookie("signhaha", "hoho", { signed: true });
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