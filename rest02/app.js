const pool = require("./db");
const express = require('express');
const path = require("node:path");
const app = express();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req, res, next) => {
    console.log("모든 요청은 여기 들렸다가 진행");
    next();
})

app.get('/', async (req, res) => {
    const conn = await pool.getConnection();
    const result = await conn.execute('select * from users');
    console.log(result);
    conn.release();
    res.send(result[0]);
})

app.post('/', async (req, res) => {
    const conn = await pool.getConnection();
    const result = await conn.execute('insert into users (id, password) values (`${req.body.name}`, `${req.body.age}`)');
    conn.release();
    res.send(result);
})

app.put('/', (req, res) => {
    res.send('Hello Put');
})

app.delete('/', (req, res) => {
    res.send('Hello Delete');
})

app.get('/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('error');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080!');
})