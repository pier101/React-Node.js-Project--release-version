const Sequelize = require("sequelize");

module.exports = class WishList extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                wishNum: {
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
                modelName: "WishList",
                tableName: "WishLists",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.WishList.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.WishList.belongsTo(db.Goods, {
            foreignKey: "goodsNum",
            targetKey: "goodsNum",
        });
    }
};
