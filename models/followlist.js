const Sequelize = require("sequelize");

module.exports = class FollowList extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                followListNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "FollowList",
                tableName: "followlist",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.FollowList.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.FollowList.belongsTo(db.Follow, {
            foreignKey: "followNum",
            targetKey: "followNum",
        });
    }
};
