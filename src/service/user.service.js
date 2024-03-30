const User = require("../model/user.model");
class UserService {
  async createUser(username, password) {
    const result = await User.create({
      username,
      password,
    });
    return result.dataValues;
  }
  async getUserInfo({ id, username, is_admin }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    username && Object.assign(whereOpt, { username });
    is_admin && Object.assign(whereOpt, { is_admin });

    const result = await User.findOne({
      attributes: ["id", "username", "is_admin"],
      where: whereOpt,
    });
    return result ? result.dataValues : null;
  }
}

module.exports = new UserService();
