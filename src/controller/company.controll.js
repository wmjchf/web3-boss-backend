const {
  getCompanyList,
  createCompany,
  getCompanyInfo,
  updateCompanyById,
} = require("../service/company.service");
const { addCompanyError } = require("../constant/company.error.type");
class CompanyController {
  async get(ctx, next) {
    const { address, id, name, pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const result = await getCompanyList({
        address,
        id,
        name,
        pageNum,
        pageSize,
      });
      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }

  async add(ctx, next) {
    const { name, logo, description, location } = ctx.request.body;
    try {
      const res = await createCompany({
        name,
        logo,
        description,
        location,
        address: ctx.state.user.address,
      });
      ctx.body = {
        status: 0,
        message: "添加项目/团队/公司成功",
        result: {
          id: res.id,
          name: res.name,
          logo: res.logo,
          location: res.location,
          description: res.description,
          address: res.address,
        },
      };
    } catch (error) {
      ctx.app.emit("error", addCompanyError, ctx);
    }
  }

  async getById(ctx, next) {
    const { id } = ctx.request.params;
    try {
      const result = await getCompanyInfo(id);
      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }

  async update(ctx, next) {
    const { id } = ctx.request.params;
    try {
      const result = await updateCompanyById(id, ctx.request.body);
      ctx.body = {
        status: 0,
        message: "修改成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new CompanyController();
