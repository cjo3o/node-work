require('dotenv').config();

// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_NAME);

const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST, // mysql 주소
    port: process.env.DB_PORT,
    user: process.env.DB_USER, // mysql 사용자
    password: process.env.DB_PASSWORD, // mysql 비밀번호
    database: process.env.DB_NAME, // mysql 디비
    waitForConnections: true, // 대기할지 여부
    connectionLimit: 10, // 최대 연결 수
    queueLimit: 0 // 대기열 최대 수 작업지시 개수
});

// try {
//     pool.getConnection((err, connection) => {
//         if (err) {
//             console.error('DB connection error', err);
//             return;
//         }
//         console.log('DB connected');
//         connection.release();
//     })
// }catch (e) {
//     console.log(e);
// }

module.exports = pool;