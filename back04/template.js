const express = require("express"); // 프레임워크(정해진 개발방법)
const path = require("path"); // 경로 설정
const nunjucks = require("nunjucks"); // res.render('index')
const morgan = require("morgan"); // 로그
const cookieParser = require("cookie-parser"); //쿠키
const expressSession = require("express-session"); //세션
const cors = require("cors"); // 리액트 각종언어통신
const multer = require("multer"); //파일업로드
const fs = require("fs"); // 폴더 만들기

// uploads 폴더 없으면 생성
try {
  // 디렉토리 uploads 가 없으면 에러
  fs.readdirSync("uploads");
} catch (e) {
  console.log("폴더가 없어서 uploads 폴더 생성");
  fs.mkdirSync("uploads");
}

// .env 로딩
require("dotenv").config();

// expresss 생성
const app = express();

/* 미들웨어 장착 시작 */
// cors 에러 해결 교차 출저
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

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
app.set("port", 4000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      console.log(ext);
      console.log(path.basename(file.originalname, ext) + Date.now() + ext);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 100 * 1024 * 1024 },
});
/* 미들웨어 장착 끝 */

app.get("/", (req, res, next) => {
  console.log("기본적인 설정 종료");
  res.render("index", { title: "TITLE제목" });
});



app.use((err, req, res, next) => {
  console.log("에러 미들웨어 동작");
  console.error(err);
  console.error(err.message);
  res.send(err.toString());
});

app.listen(app.get("port"), () => {
  console.log(`서버 ${app.get("port")}시작`);
});
