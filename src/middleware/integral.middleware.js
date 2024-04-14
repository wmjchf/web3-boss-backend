const UserService = require("../service/user.service");
const IntegralService = require("../service/integral.service");
const { integralTool } = require("../constant/integral.tool");
const { INTEGRAL } = require("../config/config.default");
const { applyNotEnough } = require("../constant/apply.error.type");
const useIntergral = async (ctx, next) => {
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

    ctx.resetIntegral = resetIntegral;
  } catch (error) {
    console.log(error);
    return;
  }
  await next();
};
const logIntergral = async (ctx, next) => {
  const url = ctx.request.url;
  const { jobId, resumeId, applyId } = ctx.request.body;
  try {
    await IntegralService.create({
      userId: ctx.state.user.id,
      count: INTEGRAL,
      type: 0,
      tool: integralTool[url],
      // ctx.jobId是创建job成功之后的id
      jobId: jobId || ctx.jobId,
      resumeId,
      // ctx.applyId是创建apply成功之后的id
      applyId: applyId || ctx.applyId,
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
module.exports = { useIntergral, logIntergral };
