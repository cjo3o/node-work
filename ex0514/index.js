const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {

    try {
        const password = "비밀번호";
        const indexhtml = await fs.readFile('./index.html');

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(indexhtml);
    } catch (err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8080, '0.0.0.0', () => {
    console.log('8080 포트에서 서버 대기 중');
})