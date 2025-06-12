"use strict";

const fs = require("fs"); // 파일 시스템 모듈
const path = require("path"); // 경로 관리 모듈
const Sequelize = require("sequelize"); //
const process = require("process"); // process dotenv
const basename = path.basename(__filename); // 현재 파일 절대 경로 까지 다 나오는거
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
// const aa = require(__dirname + '/../config/aa')['aa'];

// console.log(config);
// console.log('aa',aa);

// console.log(config);
// console.log(config.use_env_variable);

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // sequelize 객체 생성은
    // insert into values select * from
    // 함수로
    // DB 연결을 하겠다... orm 객체 생성을 insert,update,delete,select 함수로 호출할 준비
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

// seque객체를 db객체에 class변수로 적용
db.sequelize = sequelize;

const User = require('./user');
const Comment = require('./comment');

db.User = User;
db.Comment = Comment;

// initiate 함수 호출해서 컬럼 정의
User.initiate(sequelize);
Comment.initiate(sequelize);

// 관계 함수 호출해서 테이블간에 관계 정의
User.associate(db);
Comment.associate(db);

module.exports = db;

// console.log(fs.readdirSync(__dirname));

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;