const cors = require('cors');
const pool = require("./db");
const {supabase} = require("./supadb");
const express = require("express"); // http모듈 확장한 프레임워크
// app express 객체 생성
const app = express();
const path = require("path"); // 경로 관리 모듈
const morgan = require("morgan");
const cookieParser = require("cookie-parser"); // 기록 남기는 모듈

// dev 개발단계 combined 실제운영 배포에서..
app.use(morgan("dev"));
// public 폴더에 해당하는 파일이 있으면 클라이언트한테 준다.
// images 클라이언트가 접속 방법 설정
app.use("/", express.static(path.join(__dirname, "public")));
// req.body 파라메타를 받아주는거 { id: "aaa@naver.com" }
app.use(express.json());
// req.query ?aa=10
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use((req, res, next) => {
    console.log("모든 요청은 여기 들렸다가 진행된다.");
    next();
});
app.use(cors());

app.get('/supauser', async (req, res, next) => {
    const {data,error} = await supabase.from('users').select();
    console.log('data', data);
    console.log('error', error);
    res.json(data);
})

app.get('/setCookie', (req, res, next) => {
    console.log('test');
    res.cookie('haha', 'hoho', {
        expires: new Date(Date.now() + 1000 * 6),
        httpOnly: true,
        secure: true,
        signed: true});
    res.send('여기옴');
});

app.get('/getCookie', (req, res, next) => {
    console.log(req.cookies);
    res.send('저기옴');
})

app.get(
    "/",
    async (req, res, next) => {
        const conn = await pool.getConnection(); // 연결 객체 가져오기
        const result = await conn.execute("select * from users"); // sql 구문 실행
        conn.release(); // 연결 객체 반환
        next();
        // 끝...
        res.status(200).json(result[0]); // 클라이언트한테 hello get 보내기
    },
    (req, res, next) => {
        console.log("일로오나");
        // res.json('이거 두번 보내기 되냐');
    }
);
app.post("/", async (req, res) => {
    const conn = await pool.getConnection(); // 연결 객체 가져오기
    const result = await conn.execute(`insert into users
                                           (id, password)
                                       values ('${req.body.name}', '${req.body.age}')`); // sql 구문 실행
    conn.release(); // 연결 객체 반환
    res.send(result);
});
app.put("/", async (req, res) => {
    const conn = await pool.getConnection();
    const sql = "update users set id=?, password=? where idx=?";
    const result = await conn.execute(sql, [req.body.id, req.body.password, req.body.idx]);

    conn.release();
    res.send(result);
});
app.delete("/", (req, res) => {
    throw new Error("강제에러 발생");
    res.send("hello delete");
});

app.get("/html", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("에러가발생하였습니다.");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});