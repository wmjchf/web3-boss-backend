const bcrypt = require("bcryptjs");
const { SiweMessage } = require("siwe");
const { getUserInfo } = require("../service/user.service");
const { userFormateError, userVerifyError } = require("../constant/error.type");
const userValidator = async (ctx, next) => {
  const { message, signature } = ctx.request.body;
  if (!message || !signature) {
    ctx.app.emit("error", userFormateError, ctx);
    return;
  }
  await next();
};

const verifyUser = async (ctx, next) => {
  const { message, signature } = ctx.request.body;
  const { nonce } = ctx;
  try {
    const SIWEObject = new SiweMessage(message);
    const { data } = await SIWEObject.verify({
      signature,
      nonce,
    });
    ctx.siwe = data;
  } catch (error) {
    ctx.app.emit("error", userVerifyError, ctx);
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
