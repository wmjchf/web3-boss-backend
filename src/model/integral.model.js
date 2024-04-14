const { DataTypes } = require("sequelize");
const User = require("./user.model");
const Job = require("./job.model");
const seq = require("../db/seq");

const Integral = seq.define("integral", {
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
User.hasOne(Integral, {
  foreignKey: "fromId",
  sourceKey: "id",
});
Integral.belongsTo(User);
Job.hasMany(Integral);
Integral.belongsTo(Job);
// Integral.sync({
//   force: true,
// });
module.exports = Integral;
