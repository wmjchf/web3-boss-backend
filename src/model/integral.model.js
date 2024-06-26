const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Job = require("./job.model");
const Resume = require("./resume.model");
const Apply = require("./apply.model");
const seq = require("../db/seq");

const Integral = seq.define("integral1", {
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: "增加还是减少",
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "数量",
  },
  tool: {
    type: DataTypes.ENUM(
      "shareReg",
      "addJob",
      "applyJob",
      "downloadResume",
      "jobReg"
    ),
    allowNull: false,
    comment: "获得方式",
  },
});
User.hasMany(Integral);
Integral.belongsTo(User);
User.hasMany(Integral, {
  foreignKey: "fromId",
  sourceKey: "id",
});
Integral.belongsTo(User);
Resume.hasMany(Integral);
Integral.belongsTo(Resume);
Apply.hasOne(Integral);
Integral.belongsTo(Apply);
Job.hasMany(Integral);
Integral.belongsTo(Job);
// Integral.sync({
//   force: true,
// });
module.exports = Integral;
