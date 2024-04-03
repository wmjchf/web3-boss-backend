const {
  getApplyList,
  createApply,
  getApplyByUid,
  updateApplyById,
} = require("../service/apply.service");
const UserService = require("../service/user.service");
const { INTEGRAL } = require("../config/config.default");
const { applyNotEnough } = require("../constant/apply.error.type");
class CApplyController {
  async get(ctx, next) {
    const {
      pageNum = 1,
      pageSize = 10,
      jobId,
      haveRead,
      mark,
    } = ctx.request.query;
    try {
      const result = await getApplyList({
        jobId,
        pageNum,
        pageSize,
        haveRead,
        mark,
      });

      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {
      console.log(error, "fdsfs");
    }
  }

  async add(ctx, next) {
    const { jobId, resumeId, resumeUrl, resumeName, haveRead } =
      ctx.request.body;
    try {
      const { integral } = await UserService.getSelfInfo({
        id: ctx.state.user.id,
      });
      const resetIntegral = integral - INTEGRAL;
      if (resetIntegral < 0) {
        ctx.app.emit("error", applyNotEnough, ctx);
        return;
      }
      await UserService.updateUserById(ctx.state.user.id, {
        integral: resetIntegral,
      });
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
          resetIntegral,
        },
      };
    } catch (error) {
      console.log(error, "fs");
    }
  }

  async getApplyByUid(ctx, next) {
    const { id } = ctx.request.params;
    try {
      const result = await getApplyByUid(id, ctx.state.user.id);

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
      const result = await updateApplyById(id, ctx.request.body);
      ctx.body = {
        status: 0,
        message: "修改成功",
        result,
      };
    } catch (error) {
      console.log(error, "fdsf");
    }
  }
}

module.exports = new CApplyController();
