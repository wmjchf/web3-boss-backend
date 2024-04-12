const fs = require("fs");
const path = require("path");
const { request } = require("undici");
const { WX_APPID, WX_APPSECRET } = require("../config/config.default");

const getAccessToken = async (ctx, next) => {
  try {
    const txt = fs
      .readFileSync(path.join(__dirname, "../wx/token.txt"))
      .toString();
    if (txt) {
      ctx.accessToken = txt;
    } else {
      const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${WX_APPID}&secret=${WX_APPSECRET}`;
      const { body, statusCode } = await request(url);
      if (statusCode === 200) {
        const response = await body.json();
        const access_token = response.access_token;
        ctx.accessToken = access_token;
        fs.writeFileSync(path.join(__dirname, "../wx/token.txt"), access_token);
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }

  await next();
};

const getTicket = async (ctx, next) => {
  try {
    const txt = fs
      .readFileSync(path.join(__dirname, "../wx/ticket.txt"))
      .toString();
    if (txt) {
      ctx.ticket = txt;
    } else {
      const access_token = ctx.accessToken;
      const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
      const { body, statusCode } = await request(url);
      if (statusCode === 200) {
        const response = await body.json();
        console.log(response, "ffdsfdfs");
        const ticket = response.ticket;
        ctx.ticket = ticket;
        fs.writeFileSync(path.join(__dirname, "../wx/ticket.txt"), ticket);
      }
    }
  } catch (error) {
    console.log(error);
    return;
  }

  await next();
};

module.exports = {
  getAccessToken,
  getTicket,
};
