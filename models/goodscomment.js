const Sequelize = require("sequelize");

module.exports = class GoodsComment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                goodscommentNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                goodscommentContent: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                goodscommentCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "GoodsComment",
                tableName: "goodscomments",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.GoodsComment.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.GoodsComment.belongsTo(db.Goods, {
            foreignKey: "goodsNum",
            targetKey: "goodsNum",
        });
    }
};
