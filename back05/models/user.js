const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    // 컬럼 정의 하는 함수
    static initiate(sequelize) {
        User.init(
            {
                name: {
                    // varchar(20) mysql 컬럼
                    type: Sequelize.STRING(20),
                    // not null 설정
                    allowNull: false,
                    // name은 유일하다
                    unique: true,
                },
                age: {
                    // age 컬럼은 양수만 들어온다.
                    type: Sequelize.INTEGER.UNSIGNED,
                    // not null 허용 X
                    allowNull: false,
                },
                married: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
    // User 테이블과 Comment 테이블 관계 맵핑 함수
    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
    }
}

module.exports = User;