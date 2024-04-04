const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Resume = require("./resume.model");

const Job = require("./job.model");

const User = require("./user.model");

const Apply = seq.define("apply", {
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "岗位id",
  },
  // resumeId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   comment: "简历id",
  // },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "用户id",
  },
  // resumeUrl: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   comment: "简历url",
  // },
  // resumeName: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   comment: "简历文件名",
  // },
  haveRead: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "简历是否已被读",
    defaultValue: false,
  },
  mark: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "标记",
    defaultValue: false,
  },
});
User.hasMany(Apply);
Apply.belongsTo(User);
Job.hasMany(Apply);
Apply.belongsTo(Job);
Resume.hasOne(Apply);
Apply.belongsTo(Resume);
// Apply.sync({
//   force: true,
// });

module.exports = Apply;
