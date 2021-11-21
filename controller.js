// const path = require("path");
const model = require("./models");

// const salt = require(path.join(__dirname, "config")).salt;

// const hashing = require(path.join(__dirname, "config"));

module.exports = {
  // needs: () => upload,

  add: {
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, (result) => {
        if (result) {
          res.send(true);
        }
      });
    },
  
  },
  get: {
    board: (req, res) => {
      const body = req.body;

      model.get.board(body, (result) => {
        if (result) {
          res.send(result);
        }
      });
    },
    board_data : (req, res) => {
      const body = req.body;

      model.get.board_data(body, data => {
        const result = { data : data }
        res.send(result)
      })
    },
    board_cnt: (req, res) => {
      model.get.board_cnt((cnt) => {
        const result = { cnt: cnt };
        res.send(result);
      });
    },
  },
};
