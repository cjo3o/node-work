require("dotenv").config();

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:ljs56144@naver.com',
    'BLapFMVkg1-ptyOXt9kYW5DwSixtTVrXFLgbC1MCW7Ca1ZEWGC0EC1_o0hHqjNgtK5VYFgrHRU763pDljGnki4o',
    '_utg1tbHWL_dL9GYgH3MuI_NtWfW1Gl5IJ_mdVPxKUo'
)

const cors = require("cors");

// const pool = require("./db");
const mymid = require("./mymiddle");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// console.log(mymid.toString());

app.use(morgan("tiny"));
app.use(cors());
// 해당하는 파일이 있을때는 res.sendFile(), next()
app.use("/images", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(mymid);

app.get("/", (req, res, next) => {
    console.log("/호출");
    res.send("클라이언트한테보내기");
});

//서버 시작 누르기 되면 배열 값 삭제 새로고침
//배열이기 때문에 서버 재시작하면 프론트 정보 사라짐

const ss = [];

app.post("/subscribe", (req, res, next) => {
    ss.push({ sub: req.body });
    console.log(ss);
    res.send("구독성공");
});

app.get('/send', async (req, res, next) => {
    try {
        const payload = JSON.stringify({
            title: "new알림",
            body: "미세지가 좀..",
            url: "https://front02-cy6dr2s4w-cjo3os-projects.vercel.app/"
        });
        const notifications = ss.map((item) => {
            console.log(item);
            return webpush.sendNotification(item.sub, payload);
        })
        await Promise.all(notifications);
    } catch (e) {
        console.error(e);
        res.json({
            message: "알림 전송 실패"
        })
    }
})

app.listen(8080, () => {
    console.log("서버 8080시작");
});


