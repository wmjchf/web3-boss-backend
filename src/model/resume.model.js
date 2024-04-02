const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Resume = seq.define("resume", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "简历地址",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "文件名字",
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
});

// Resume.sync({
//   force: true,
// });

module.exports = Resume;
