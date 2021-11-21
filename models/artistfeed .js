const Sequelize = require("sequelize");

module.exports = class ArtistFeed extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                artistFeedNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                artistfeedContent: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
                artistfeedImg: {
                    type: Sequelize.STRING(300),
                    allowNull: true,
                },
                artistfeedCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "artistFeed",
                tableName: "aritstfeeds",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.ArtistFeed.belongsTo(db.User, {
            foreignKey: "userId",
            sourceKey: "userId",
        });
        db.ArtistFeed.belongsTo(db.ArtistCard, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.ArtistFeed.hasMany(db.Comment, {
            foreignKey: "artistFeedNum",
            sourceKey: "artistFeedNum",
        });
        db.ArtistFeed.hasMany(db.ThumbsUp, {
            foreignKey: "artistFeedNum",
            sourceKey: "artistFeedNum",
        });
    }
};
