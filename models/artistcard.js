const Sequelize = require("sequelize");

module.exports = class ArtistCard extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                artistCardNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                artistCardImg: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                artistName: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    primaryKey: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "ArtistCard",
                tableName: "artistCards",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.ArtistCard.hasMany(db.Artist, {
            foreignKey: "artistCardNum",
            sourceKey: "artistCardNum",
        });
        db.ArtistCard.hasMany(db.Feed, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.ArtistCard.hasMany(db.Comment, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.ArtistCard.hasMany(db.Follow, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.ArtistCard.hasMany(db.ArtistFeed, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });
        db.ArtistCard.hasMany(db.Goods, {
            foreignKey: "artistName",
            sourceKey: "artistName",
        });

    }
};
