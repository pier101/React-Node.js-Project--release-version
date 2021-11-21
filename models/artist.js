const Sequelize = require("sequelize");

module.exports = class Artist extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                artistId: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    primaryKey: true,
                },
                artistPwd: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                artistName: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                artistMail: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                },
                level: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 2,
                },
                artistCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                provider: {
                    type: Sequelize.STRING(10),
                    allowNull: false,
                    defaultValue: "local",
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Artist",
                tableName: "artists",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Artist.hasMany(db.Comment, {
            foreignKey: "artistId",
            sourceKey: "artistId",
        });
        db.Artist.hasMany(db.ThumbsUp, {
            foreignKey: "artistId",
            sourceKey: "artistId",
        });
        db.Artist.hasMany(db.Goods, {
            foreignKey: "artistId",
            sourceKey: "artistId",
        });
    }
};
