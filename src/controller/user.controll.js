const { generateNonce } = require("siwe");
const jwt = require("jsonwebtoken");
const {
  createUser,
  getUserInfo,
  getSelfInfo,
  updateUserById,
} = require("../service/user.service");
const { userLoginError, userNonceError } = require("../constant/error.type");
const { JWT_SECRET, ADD_INTEGRAL } = require("../config/config.default");
class UserControll {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;

    try {
      const res = await createUser(username, password);

      ctx.body = {
        code: 0,
        message: "注册成功",
        result: {
          id: res.id,
          username: res.username,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
      return;
    }
  }
  async login(ctx, next) {
    const { siwe } = ctx;
    const { share } = ctx.request.body;
    const { address, chainId } = siwe;
    let result = await getUserInfo({ address });
    const shareUser = await getUserInfo({ address: share });
    try {
      if (!result) {
        result = await createUser(address, chainId);
        if (shareUser) {
          await updateUserById(shareUser.id, {
            integral: shareUser.integral + parseInt(ADD_INTEGRAL),
          });
        }
      }
      ctx.body = {
        code: 0,
        message: "登录成功",
        result: {
          token: jwt.sign(
            { address: result.address, chainId: result.chainId, id: result.id },
            JWT_SECRET,
            {
              expiresIn: "1d",
            }
          ),
        },
      };
    } catch (error) {
      ctx.app.emit("error", userLoginError, ctx);
    }
  }

  async getNonce(ctx, next) {
    try {
      const nonce = generateNonce();
      ctx.nonce = nonce;
      ctx.body = {
        status: 0,
        message: "获取nonce成功",
        result: {
          nonce,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userNonceError, ctx);
    }
  }

  async getSelf(ctx, next) {
    const { id } = ctx.state.user;
    try {
      const result = await getSelfInfo({ id });
      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new UserControll();
