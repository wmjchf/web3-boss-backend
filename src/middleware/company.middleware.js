const {
  addCompanyParamsError,
  updateCompanyError,
} = require("../constant/company.error.type");
const { getCompanyInfo } = require("../service/company.service");
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      name: {
        type: "string",
        require: true,
      },
      logo: {
        type: "string",
        require: true,
      },
      description: {
        type: "string",
        require: true,
      },
      location: {
        type: "string",
        require: true,
      },
    });
  } catch (error) {
    ctx.app.emit("error", addCompanyParamsError, ctx);
    return;
  }
  await next();
};

const isOwner = async (ctx, next) => {
  try {
    const { id } = ctx.request.params;
    const result = await getCompanyInfo(id);
    if (result.address !== ctx.state.user.address) {
      ctx.app.emit("error", updateCompanyError, ctx);
      return;
    }
  } catch (error) {}
  await next();
};

module.exports = {
  validator,
  isOwner,
};
