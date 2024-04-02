const User = require("../model/user.model");
class UserService {
  async createUser(address, chainId) {
    const result = await User.create({
      address,
      chainId,
    });
    return result.dataValues;
  }
  async getUserInfo({ id, address, chainId }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    address && Object.assign(whereOpt, { address });
    chainId && Object.assign(whereOpt, { chainId });

    const result = await User.findOne({
      attributes: ["id", "address", "chainId"],
      where: whereOpt,
    });
    return result ? result.dataValues : null;
  }
  async getSelfInfo({ id }) {
    const result = await User.findOne({
      attributes: ["id", "address", "chainId", "integral"],
      where: { id },
    });
    return result ? result.dataValues : null;
  }
}

module.exports = new UserService();
