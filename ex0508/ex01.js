const http = require("http");

http
    .createServer((req, res) => {
        console.log("통신함");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, OPTIONS"
        );
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        console.log('req.method', req.method);

        if (req.method === "OPTIONS") {
            res.writeHead('204');
            res.end();
            return;
        }

        if (req.method === 'GET') {
            res.end("return value");
        } else if (req.method === 'POST') {
            const objData = {};
            req.on("data", (chunk) => {
                // console.log(chunk);
                console.log(chunk.toString());
                objData.chunk = chunk;
            });
            try {
                const datajson = JSON.parse(chuck.toString());
                console.log(datajson.name);
                console.log(datajson.age);
            } catch (err) {
                // console.log(err);
            }
            res.end("supabase 데이터베이스에 저장함ㅇ");
        } else {
            res.end("GET, POST 에 걸리지 않음");
        }
    })
    .listen(8005, () => {
        console.log("server 시작함");
    });
