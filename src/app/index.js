const path = require("path");
const Koa = require("koa");
const KoaStatic = require("koa-static");
const { koaBody } = require("koa-body");
const cors = require("koa2-cors");
const parameter = require("koa-parameter");
const { ORIGIN } = require("../config/config.default");
const router = require("../router");
const errorHandler = require("./errorHandler");
const app = new Koa();

app.use(
  cors({
    origin: function (ctx) {
      return ORIGIN;
    },
  })
);

app.use(KoaStatic(path.join(__dirname, "../upload")));

app.use(parameter(app));
app.use(
  koaBody({
    multipart: true,
  })
);

app.use(router.routes()).use(router.allowedMethods());

app.on("error", errorHandler);

module.exports = app;
