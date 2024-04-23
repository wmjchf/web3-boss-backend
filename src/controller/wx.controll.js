const { sha1 } = require("../utils/sha1");
const { WX_APPID } = require("../config/config.default");
class WXController {
  async get(ctx, next) {
    const noncestr = Math.random().toString().split(".")[1];
    const timestamp = Date.now();
    const signatureArr = [
      `noncestr=${noncestr}`,
      `jsapi_ticket=${ctx.ticket}`,
      `timestamp=${timestamp}`,
      `url=${ctx.query.url}`,
    ];
    const signatureStr = signatureArr.sort().join("&");
    const signatur = sha1(signatureStr);
    try {
      ctx.body = {
        status: 0,
        message: "获取成功",
        result: {
          noncestr,
          timestamp,
          signatur,
          appId: WX_APPID,
        },
      };
    } catch (error) {
      console.log(error, "fs");
    }
  }
  async sign(ctx, next) {}
}

module.exports = new WXController();
