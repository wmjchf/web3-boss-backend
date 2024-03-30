const { createUser, getUserInfo } = require("../service/user.service");
const { userRegisterError } = require("../constant/error.type");
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
    ctx.body = "用户登录城市";
  }
}

module.exports = new UserControll();
