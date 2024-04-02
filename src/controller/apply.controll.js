const {
  getApplyList,
  createApply,
  getApplyByUid,
} = require("../service/apply.service");
class CApplyController {
  async get(ctx, next) {
    const { pageNum = 1, pageSize = 10, jobId } = ctx.request.query;
    try {
      const result = await getApplyList({
        jobId,
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
    const { jobId, resumeId, resumeUrl, resumeName, haveRead } =
      ctx.request.body;
    try {
      const res = await createApply({
        jobId,
        resumeId,
        resumeUrl,
        resumeName,
        haveRead,
        uid: ctx.state.user.id,
      });
      ctx.body = {
        status: 0,
        message: "申请成功",
        result: {
          id: res.id,
          resumeUrl: res.resumeUrl,
        },
      };
    } catch (error) {
      console.log(error, "fs");
    }
  }

  async getApplyByUid(ctx, next) {
    try {
      const result = await getApplyByUid(ctx.state.user.id);

      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new CApplyController();
