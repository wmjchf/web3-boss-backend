const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config.default");
const { tokenExpiredError, invalidToken } = require("../constant/error.type");
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  try {
    const token = authorization.replace("Bearer ", "");
    const user = jwt.verify(token, JWT_SECRET);

    ctx.state.user = user;
  } catch (error) {
    switch (error.name) {
      case "TokenExpiredError":
        ctx.app.emit("error", tokenExpiredError, ctx);
        break;
      case "JsonWebTokenError":
        ctx.app.emit("error", invalidToken, ctx);
        break;
    }
    return;
  }
  await next();
};

module.exports = {
  auth,
};
