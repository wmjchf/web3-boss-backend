const { create, findAll } = require("../service/integral.service");

class IntegralController {
  async addIntegral(ctx, next) {
    const { userId, fromId, jobId, count, tool, type } = ctx.request.body;
    try {
      const res = await create({
        userId,
        fromId,
        jobId,
        count,
        tool,
        type,
      });
      ctx.body = {
        status: 0,
        message: "操作成功",
        result: true,
      };
    } catch (error) {}
  }

  async getList(ctx, next) {
    const {
      pageNum = 1,
      pageSize = 10,
      userId,
      jobId,
      fromId,
      type,
      tool,
    } = ctx.request.query;

    try {
      const result = await findAll({
        pageNum,
        pageSize,
        userId,
        jobId,
        fromId,
        type,
        tool,
      });

      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new IntegralController();
