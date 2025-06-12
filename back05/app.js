// 설치한 npm i
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
require("dotenv").config();
const cors = require("cors");

// models 폴더 안에 index.js 파일 호출해라
const { sequelize, User } = require("./models");
// console.log(sequelize);

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");

nunjucks.configure("views", {
    express: app,
    watch: true,
});

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("DB연결 성공");
    })
    .catch((err) => {
        console.error(err);
    });

//함수 만들어서 즉시 함수 호출 실행..
(async function (){
    // await 를 top level 에서 사용 불가능 해서...
    const result = await User.findAll({
        attributes:['name','age']
    });
    console.log(result);
})();

// const result = User.findAll({});
//   console.log(result);


// User.create({
//   name: "ㅂㅈㄷㄱ",
//   age: 20,
//   married: 0,
//   comment: "ㅂㅈㄷㄱ라는 사람이야",
// });

app.use(morgan("dev"));
app.use(express.json(), express.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: false,
        },
        name: "session-cookie",
    })
);
app.set("port", 4001);
app.set("view engine", "html");
nunjucks.configure("views", {
    express: app,
    watch: true,
});

app.use(cors());
/* 미들웨어 장착 끝 */
const resRouter = require("./routes/resRouter");
const driverRouter = require("./routes/driverRouter");
app.use("/res", resRouter);
app.use("/driver", driverRouter);

app.use((req, res, next) => {
    console.log("해당하는 라우터가 없다");
    const error = new Error("해당하는 페이지가 없습니다.");
    next(error); // 에러 미들웨어로 가라
});

app.use((err, req, res, next) => {
    console.log("에러 미들웨어 동작");
    console.error(err);
    console.error(err.message);
    res.send(err.toString() + "<a href='/'>첫페이지로</a>");
});

app.listen(app.get("port"), () => {
    console.log(`서버 ${app.get("port")}시작`);
});