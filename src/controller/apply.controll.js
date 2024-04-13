const {
  getApplyList,
  createApply,
  getApplyByUserId,
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
      isDownload,
    } = ctx.request.query;
    try {
      const result = await getApplyList({
        jobId,
        pageNum,
        pageSize,
        haveRead,
        mark,
        isDownload,
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
    const { jobId, resumeId } = ctx.request.body;
    try {
      // const { integral } = await UserService.getSelfInfo({
      //   id: ctx.state.user.id,
      // });
      // const resetIntegral = integral - INTEGRAL;
      // if (resetIntegral < 0) {
      //   ctx.app.emit("error", applyNotEnough, ctx);
      //   return;
      // }
      // await UserService.updateUserById(ctx.state.user.id, {
      //   integral: resetIntegral,
      // });
      const res = await createApply({
        jobId,
        resumeId,
        userId: ctx.state.user.id,
      });

      ctx.body = {
        status: 0,
        message: "投递成功",
        result: {
          id: res.id,
          resetIntegral: ctx.resetIntegral,
        },
      };
    } catch (error) {
      console.log(error, "fs");
    }
  }

  async getApplyByUserId(ctx, next) {
    const { pageNum = 1, pageSize = 10, jobId } = ctx.request.query;

    try {
      const result = await getApplyByUserId({
        jobId,
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
