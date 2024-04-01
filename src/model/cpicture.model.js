const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const CPicture = seq.define("cpicture", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "图片地址",
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "项目/团队/公司id",
  },
});

// CPicture.sync({
//   force: true,
// });

module.exports = CPicture;
