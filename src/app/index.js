const path = require("path");
const Koa = require("koa");
const KoaStatic = require("koa-static");
const compress = require("koa-compress");
const history = require("koa-connect-history-api-fallback");
const { koaBody } = require("koa-body");
const sslify = require("koa-sslify").default;
const cors = require("koa2-cors");
const parameter = require("koa-parameter");
const { ORIGIN, ENV, APP_PORT } = require("../config/config.default");
const router = require("../router");
const errorHandler = require("./errorHandler");
const app = new Koa();

const options = { threshold: 2048 };
app.use(compress(options));

app.use(
  cors({
    origin: function (ctx) {
      return ORIGIN;
    },
  })
);
if (ENV === "production" && APP_PORT === "443") {
  app.use(sslify());
}

app.use(history());
app.use(
  KoaStatic(path.join(__dirname, "../static"), {
    maxage: 2592000000,
  })
);

app.use(parameter(app));
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
