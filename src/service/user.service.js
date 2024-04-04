const Apply = require("../model/apply.model");
const Company = require("../model/company.model");
const Resume = require("../model/resume.model");
const User = require("../model/user.model");
class UserService {
  async createUser(address, chainId) {
    const result = await User.create({
      address,
      chainId,
    });
    return result.dataValues;
  }

  async updateUserById(id, data) {
    const result = await User.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }

  async getUserInfo({ id, address, chainId }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    address && Object.assign(whereOpt, { address });
    chainId && Object.assign(whereOpt, { chainId });

    const result = await User.findOne({
      include: [
        {
          model: Resume,
        },
        {
          model: Apply,
        },
      ],
      attributes: ["id", "address", "chainId", "integral"],
      where: whereOpt,
    });
    return result ? result.dataValues : null;
  }
  async getSelfInfo({ id }) {
    const result = await User.findOne({
      include: [
        {
          model: Resume,
        },
        {
          model: Apply,
        },
        { model: Company },
      ],
      attributes: ["id", "address", "chainId", "integral"],
      where: { id },
    });
    return result ? result.dataValues : null;
  }
}

module.exports = new UserService();
