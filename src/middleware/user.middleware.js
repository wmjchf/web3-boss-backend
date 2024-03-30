const bcrypt = require("bcryptjs");
const { getUserInfo } = require("../service/user.service");
const {
  userAlreadyExited,
  userFormateError,
  userRegisterError,
} = require("../constant/error.type");
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body;
  try {
    const result = await getUserInfo({ username });
    if (result) {
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }

  await next();
};
const crpyt = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  crpyt,
};
