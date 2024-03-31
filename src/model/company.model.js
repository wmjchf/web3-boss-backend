const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

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
    type: DataTypes.STRING,
    allowNull: false,
    comment: "描述",
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "项目/团队/公司所属账号",
  },
});

// User.sync({
//   force: true,
// });

module.exports = Company;
