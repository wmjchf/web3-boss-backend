const UserService = require("../service/user.service");
const IntegralService = require("../service/integral.service");
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
    await IntegralService.create({
      userId: ctx.state.user.id,
      count: INTEGRAL,
    });
    ctx.resetIntegral = resetIntegral;
  } catch (error) {
    console.log(error);
    return;
  }
  await next();
};
module.exports = { useIntergral };
