const Sequelize = require("sequelize");

module.exports = class Admin extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                adminId: {
                    type: Sequelize.STRING(30),
                    primaryKey: true,
                    allowNull: false,
                },
                adminPwd: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                adminName: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                level: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: true,
                    defaultValue: "3",
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "admin",
                tableName: "admins",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Admin.hasMany(db.ArtistCard, {
            foreignKey: "adminId",
            sourceKey: "adminId",
        });
    }
};
