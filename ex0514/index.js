const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    console.log(req.url);

    try {
        if (req.url === '/') {
            const password = "비밀번호";
            const indexhtml = await fs.readFile('./index.html');

            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end(indexhtml);
        } else if (req.url === '/join' && req.method === 'POST') {

            req.setEncoding('utf-8');

            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            req.on('end', () => {
                console.log(body);

                const {id, password} = JSON.parse(body);
                console.log(id, password);
            })

            console.log(body);

            const obj = {
                name: '홍길동',
                age: 20
            }
            res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
            return res.end(JSON.stringify(obj));
        } else if (req.url === '/login') {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            return res.end('로그인 성공');
        } else {
            res.writeHead(404, ({'Content-Type': 'text/plain; charset=utf-8'}));
            return res.end('잘못된 경로입니다.')
        }
    } catch
        (err) {
        console.error(err);
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8080, '0.0.0.0', () => {
    console.log('8080 포트에서 서버 대기 중');
})