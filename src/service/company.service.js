const Company = require("../model/company.model");
class CompanyService {
  async createCompany({ name, logo, description, address }) {
    const result = await Company.create({
      name,
      logo,
      description,
      address,
    });
    return result.dataValues;
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
