const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Job = seq.define("job", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "岗位名称",
  },
  isRemote: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "是否支持远程",
  },
  minSalary: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "最低工资",
  },
  maxSalary: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "最高工资",
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "标签",
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    comment: "标签",
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: "项目/团队/公司id",
  },
});

// Job.sync({
//   force: true,
// });

module.exports = Job;
