const Sequelize = require("sequelize");

module.exports = class Follow extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                followNum: {
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
                modelName: "Follow",
                tableName: "follow",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Follow.belongsTo(db.User, {
            foreignKey: "userId", 
            targetKey: "userId",
        });
        db.Follow.belongsTo(db.ArtistCard, {
            foreignKey: "artistName",
            targetKey: "artistName",
        });
    }
};
