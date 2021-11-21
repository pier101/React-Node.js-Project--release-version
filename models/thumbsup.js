const Sequelize = require("sequelize");

module.exports = class ThumbsUp extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                thumbsUpNum: {
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
                modelName: "ThumbsUp",
                tableName: "thumbsUp",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.ThumbsUp.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.ThumbsUp.belongsTo(db.Feed, {
            foreignKey: "feedNum",
            targetKey: "feedNum",
        });
        db.ThumbsUp.belongsTo(db.ArtistFeed, {
            foreignKey: "artistFeedNum",
            targetKey: "artistFeedNum",
        });
    }
};
