const Sequelize = require("sequelize");

module.exports = class Feed extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                feedNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                feedContent: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
                feedCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Feed",
                tableName: "feeds",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Feed.belongsTo(db.User, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.Feed.belongsTo(db.ArtistCard, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.Feed.hasMany(db.Comment, {
            foreignKey: "feedNum",
            sourceKey: "feedNum",
        });
        db.Feed.hasMany(db.ThumbsUp, {
            foreignKey: "feedNum",
            sourceKey: "feedNum",
        });
        db.Feed.hasMany(db.Image, {
            foreignKey: "feedNum",
            sourceKey: "feedNum",
        });
    }
};
