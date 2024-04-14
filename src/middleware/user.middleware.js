const bcrypt = require("bcryptjs");
const { SiweMessage } = require("siwe");
const IntegralService = require("../service/integral.service");
const { ADD_INTEGRAL } = require("../config/config.default");
const {
  getUserInfo,
  createUser,
  updateUserById,
} = require("../service/user.service");
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

const verifyShare = async (ctx, next) => {
  const { siwe } = ctx;
  const { share, jobId } = ctx.request.body;
  const { address, chainId } = siwe;
  let result = await getUserInfo({ address });
  try {
    const shareUser0 = await getUserInfo({ address: share[0] });
    const shareUser1 = await getUserInfo({ address: share[1] });

    if (!result) {
      result = await createUser(address, chainId);
      if (shareUser0) {
        await updateUserById(shareUser0.id, {
          integral: shareUser0.integral + parseInt(ADD_INTEGRAL),
        });
        await IntegralService.create({
          userId: shareUser0.id,
          count: ADD_INTEGRAL,
          type: 1,
          tool: "jobReg",
          fromId: result.id,
          jobId,
        });
      }
      if (shareUser1) {
        await updateUserById(shareUser1.id, {
          integral: shareUser1.integral + parseInt(ADD_INTEGRAL),
        });
        await IntegralService.create({
          userId: shareUser1.id,
          count: ADD_INTEGRAL,
          type: 1,
          tool: "shareReg",
          fromId: result.id,
        });
      }
    }
    ctx.userInfo = result;
  } catch (error) {
    console.log(error);
    return;
  }
  await next();
};
module.exports = {
  userValidator,
  verifyUser,
  crpyt,
  verifyShare,
};
