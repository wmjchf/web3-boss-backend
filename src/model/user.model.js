const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const User = seq.define("user", {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "链上地址，唯一",
  },
  chainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "链id",
  },
  integral: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    comment: "积分",
  },
});

// User.sync({
//   force: true,
// });

module.exports = User;
