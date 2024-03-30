const { createUser, getUserInfo } = require("../service/user.service");
class UserControll {
  async register(ctx, next) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      ctx.status = 400;
      ctx.body = {
        code: "10001",
        message: "用户名或者密码为空",
        result: "",
      };
      return;
    }
    if (getUserInfo({ username })) {
      ctx.status = 409;
      ctx.body = {
        code: "10002",
        message: "用户已经存在",
        result: "",
      };
      return;
    }
    const res = await createUser(username, password);

    ctx.body = {
      code: 0,
      message: "注册成功",
      result: {
        id: res.id,
        username: res.username,
      },
    };
  }
  async login(ctx, next) {
    ctx.body = "用户登录城市";
  }
}

module.exports = new UserControll();
