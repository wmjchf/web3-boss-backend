const { addCompanyParamsError } = require("../constant/company.error.type");
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

module.exports = {
  validator,
};
