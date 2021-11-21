const Sequelize = require("sequelize");

module.exports = class Goods extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                goodsNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                goodsName: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                goodsPrice: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                goodsContent: {
                    type: Sequelize.STRING(3000),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Goods",
                tableName: "Goods",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Goods.belongsTo(db.Artist, {
            foreignKey: "artistId",
            targetKey: "artistId",
        });
        db.Goods.belongsTo(db.ArtistCard, {
            foreignKey: "artistName",
            targetKey: "artistName",
        });
        db.Goods.hasMany(db.OrderGoods, {
            foreignKey: "goodsNum",
            sourceKey: "goodsNum",
        });
        db.Goods.hasMany(db.GoodsComment, {
            foreignKey: "goodsNum",
            sourceKey: "goodsNum",
        });
        //일단 보류
        // db.Goods.belongsTo(db.Category, {
        //     foreignKey: "categoryNum",
        //     targetKey: "categoryNum",
        // });
    }
};
