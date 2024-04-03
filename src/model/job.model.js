const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Job = seq.define("job", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "岗位名称",
  },
  isRemote: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "是否支持远程",
  },
  location: {
    type: DataTypes.STRING,
    comment: "工作地址（一般和公司地址一样）",
  },
  isFace: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "是否面议",
  },
  minSalary: {
    type: DataTypes.STRING,
    comment: "最低工资",
  },
  maxSalary: {
    type: DataTypes.STRING,
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
  isDelete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: "是否删除",
    defaultValue: false,
  },
});

// Job.sync({
//   force: true,
// });

module.exports = Job;
