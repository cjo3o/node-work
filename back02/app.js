require("dotenv").config();

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:ljs56144@naver.com',
    'BLapFMVkg1-ptyOXt9kYW5DwSixtTVrXFLgbC1MCW7Ca1ZEWGC0EC1_o0hHqjNgtK5VYFgrHRU763pDljGnki4o',
    '_utg1tbHWL_dL9GYgH3MuI_NtWfW1Gl5IJ_mdVPxKUo'
)

const cors = require("cors");

const pool = require("./db");
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

app.post("/subscribe", async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.body.sub);
    // console.log(req.body.sub.endpoint);
    // console.log(req.body.sub.p256dn);
    // console.log(req.body.city);

    const conn = await pool.getConnection();
    const sql = "insert into subscriptions (endpoint, p256dh, auth, city) values (?,?,?,?)";
    const result = await conn.execute(sql, [req.body.sub.endpoint, req.body.sub.keys.p256dh, req.body.sub.keys.auth, req.body.city]);

    conn.release();
    res.send("구독성공" + result[0]);
});

app.get("/send", async (req, res, next) => {
    try {
        const {city} = req.query;

        const conn = await pool.getConnection();
        const sql = "select * from subscriptions where city = ?";
        const result = await conn.execute(sql, [city]);
        console.log(result);

        const payload = JSON.stringify({
            title: "new 알림",
            body: "미세먼지가.. 좀... 버스가 몇분뒤 도착...하였습니다.",
            url: "https://front02-oasg9q11z-cjo3os-projects.vercel.app/"
        });
        const notifications = result[0].map(item => {
            console.log('item = ', item);
            const temp = {
                endpoint: item.endpoint,
                expirationTime: null,
                keys: {
                    p256dh: item.p256dh,
                    auth: item.auth,
                },
            };
            return webpush.sendNotification(temp, payload);
        })
        console.log("notifications = ", notifications);
        await Promise.all(notifications);
        res.json({message: "푸시 알람 전송 성공"});
    } catch (e) {
        console.log(e);
        res.json({message: "푸시 알람 전송 실패"});
    }
});

app.listen(8080, () => {
    console.log("서버 8080시작");
});


