const Sequelize = require("sequelize");

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                commentNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                commentContent: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                commentCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Comment",
                tableName: "comments",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        db.Comment.belongsTo(db.Feed, {
            foreignKey: "feedNum",
            targetKey: "feedNum",
        });
        db.Comment.belongsTo(db.ArtistCard, {
            foreignKey: "artistName",
            targetKey: "artistName",
        });
        db.Comment.belongsTo(db.ArtistFeed, {
            foreignKey: "artistFeedNum",
            targetKey: "artistFeedNum",
        });
    }
};
