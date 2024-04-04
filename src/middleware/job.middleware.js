const { getCompanyInfo } = require("../service/company.service");
const {
  companyNotExist,
  notAuth,
  addJobError,
} = require("../constant/job.error.type");
const verifyCompanyId = async (ctx, next) => {
  const { companyId } = ctx.request.body;

  try {
    const result = await getCompanyInfo(companyId);
    if (!result) {
      ctx.app.emit("error", companyNotExist, ctx);
      return;
    } else {
      const { userId } = result;
      if (userId !== ctx.state.user.id) {
        ctx.app.emit("error", notAuth, ctx);
        return;
      }
    }
  } catch (error) {
    ctx.app.emit("error", addJobError, ctx);
    return;
  }
  await next();
};

module.exports = {
  verifyCompanyId,
};
