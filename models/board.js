const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        board_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },

        title: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },

        contents: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        date: {
          type: Sequelize.DATE,
          allowNull: false,
        },

        // view_cnt: {
        //   type: Sequelize.INTEGER(10),
        //   // allowNull: false,
        //   defaultValue: 0,
        // },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Board",
        tableName: "boards",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {}
};
