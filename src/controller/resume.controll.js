const { getResumeList, createResume } = require("../service/resume.service");
class CResumeController {
  async get(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const result = await getResumeList({
        userId: ctx.state.user.id,
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
    const { url, name } = ctx.request.body;
    try {
      const res = await createResume({
        url,
        userId: ctx.state.user.id,
        name,
      });
      ctx.body = {
        status: 0,
        message: "添加简历成功",
        result: {
          id: res.id,
          url: res.url,
        },
      };
    } catch (error) {}
  }
}

module.exports = new CResumeController();
