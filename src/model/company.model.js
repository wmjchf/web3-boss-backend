const { DataTypes } = require("sequelize");

const seq = require("../db/seq");
const User = require("./user.model");
const Company = seq.define("company", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: "项目/团队/公司地址",
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "logo图片",
  },
  description: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
    comment: "描述",
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "办公地址",
  },
});
User.hasMany(Company);
Company.belongsTo(User);
// Company.sync({
//   force: true,
// });

module.exports = Company;
