const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const multer = require('multer');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const expressSession = require('express-session');
const cors = require('cors');
const fs = require('fs');

try {
    fs.readdirSync("uploads");
} catch (e) {
    console.error("uploads 폴더가 없어서 uploads 폴더 생성합니다.");
    fs.mkdirSync("uploads");
}

dotenv.config();

// console.log(process.env.AA);
// console.log(process.env.BB);

const app = express();

app.use((req, res, next) => {
    console.log("그 다음 미들웨어로 진행");
    next();
}, (req,res,next) => {
    console.log("다음 미들웨어");
    next()
}, (req, res, next) => {
    console.log("다음 미들웨어");
    next()
})

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));

// 미들웨어 사용 다른 방법
app.use((req,res,next) => {
    morgan()(req,res,next);
});

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
app.set('view engine', 'html');

nunjucks.configure('views', {
    express: app,
    watch: true
});

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, done) => {
            done(null, 'uploads'); //파일이 업로드 되면 uplodas경로에 저장하겠다.
        },
        filename: (req, file, done) => {
            const ext = path.extname(file.originalname);
            // 원래 파일명 + 현재시간 + 확장자로 설정하겠다.
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 30}
})

app.get("/", (req, res, next) => {
    console.log(req.body);
    console.log(req.query);
    console.log("/경로 요청");

    // 데이터 베이스에 가서
    res.locals.member = [{
        name: "홍길동",
        age: 20
    }, {
        name: "홍길동",
        age: 20
    }, {
        name: "홍길동",
        age: 20
    }]

    res.locals.data = "새로운 데이터";
    res.locals.aaa = "aaa데이터";
    res.render("index", {title: "제목"});
});

app.get("/multipart", (req, res, next) => {
    res.render("multipart");
});

app.post("/upload",upload.single('image'), (req, res, next) => {
    console.log(req.file, req.body);
    res.send("저장성공");
})

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