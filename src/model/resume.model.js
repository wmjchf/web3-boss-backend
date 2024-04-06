const { DataTypes } = require("sequelize");
const User = require("./user.model");
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
  isDelete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "是否删除",
    defaultValue: false,
  },
});
User.hasMany(Resume);
Resume.belongsTo(User);

// Resume.sync({
//   force: true,
// });
module.exports = Resume;
