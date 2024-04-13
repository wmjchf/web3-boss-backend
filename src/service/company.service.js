const Company = require("../model/company.model");
const User = require("../model/user.model");
class CompanyService {
  async createCompany({ name, logo, description, userId, location }) {
    const result = await Company.create({
      name,
      logo,
      description,
      userId,
      location,
    });
    return result.dataValues;
  }

  async getCompanyList({ address, name, id, pageNum, pageSize }) {
    const whereOpt = {};

    address && Object.assign(whereOpt, { address });
    name && Object.assign(whereOpt, { name });
    id && Object.assign(whereOpt, { id });
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Company.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ["name", "id", "address"],
      where: whereOpt,
    });

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    };
  }
  async getCompanyInfo(id) {
    const result = await Company.findOne({
      include: [
        {
          model: User,
        },
      ],
      attributes: ["id", "location", "description", "logo", "name", "userId"],
      where: {
        id,
      },
    });
    return result ? result.dataValues : null;
  }
  async updateCompanyById(id, data) {
    const result = await Company.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
  //   async getUserInfo({ id, address, chainId }) {
  //     const whereOpt = {};

  //     id && Object.assign(whereOpt, { id });
  //     address && Object.assign(whereOpt, { address });
  //     chainId && Object.assign(whereOpt, { chainId });

  //     const result = await User.findOne({
  //       attributes: ["id", "address", "chainId"],
  //       where: whereOpt,
  //     });
  //     return result ? result.dataValues : null;
  //   }
}

module.exports = new CompanyService();
