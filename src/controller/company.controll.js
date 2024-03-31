class CompanyController {
  async get(ctx, next) {
    ctx.body = {
      status: 0,
      message: "获取成功",
      result: {
        data: [],
      },
    };
  }

  async add() {}
}

module.exports = new CompanyController();
