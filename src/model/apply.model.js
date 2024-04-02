const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Apply = seq.define("apply", {
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "岗位id",
  },
  resumeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "简历id",
  },
  uid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  resumeUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "简历url",
  },
  resumeName: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "简历文件名",
  },
  haveRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "简历是否已被读",
    defaultValue: false,
  },
});

// Apply.sync({
//   force: true,
// });

module.exports = Apply;
