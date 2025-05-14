const http = require("http");

http.createServer((req, res) => {
    console.log("암호화 패스워드");
    console.log(req.url, req.headers.cookie);
    res.end('Hello');
}).listen(8003, () => {
    console.log('8003포트로 실행 되었습니다.')
})