const Sequelize = require("sequelize");

module.exports = class OrderGoods extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                orderQty: { //수량
                    type: Sequelize.INTEGER(45),
                    allowNull: true,
                },
                goods_color: {   
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                goods_size: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                buyer_hp: {     //배송지 핸드폰
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                buyer_address: {    //배송지 주소
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                buyer_email: {    //배송 확인 이메일
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                orderCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
                //foriegn key로 못 받아오면 추가 db생성하기
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "OrderGoods",
                tableName: "OrderGoods",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        //forienkey 여러개 가능?하면 추가하기
        db.OrderGoods.belongsTo(db.Goods, {
            foreignKey: "goodsNum",
            targetKey: "goodsNum",
        });
        db.OrderGoods.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        // db.orderGoods.hasMany(db.orderGoodsDetail, {
        //     foreignKey: "orderGoodsNum",
        //     sourceKey: "orderGoodsNum",
        // });
    }
};