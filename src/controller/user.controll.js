const { generateNonce } = require("siwe");
const jwt = require("jsonwebtoken");
const { createUser, getSelfInfo } = require("../service/user.service");
const { userLoginError, userNonceError } = require("../constant/error.type");
const { JWT_SECRET } = require("../config/config.default");
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
    const { userInfo } = ctx;
    try {
      ctx.body = {
        code: 0,
        message: "登录成功",
        result: {
          token: jwt.sign(
            {
              address: userInfo.address,
              chainId: userInfo.chainId,
              id: userInfo.id,
            },
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
      if (result) {
        ctx.body = {
          status: 0,
          message: "获取成功",
          result,
        };
      } else {
        ctx.app.emit(
          "error",
          {
            code: "10006",
            message: "用户不存在",
            result: "",
          },
          ctx
        );
      }
    } catch (error) {}
  }
}

module.exports = new UserControll();
