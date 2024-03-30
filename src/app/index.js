const Koa = require("koa");
const { koaBody } = require("koa-body");
const userRouter = require("../router/user.route");
const errorHandler = require("./errorHandler");
const app = new Koa();

app.use(koaBody());

app.use(userRouter.routes());

app.on("error", errorHandler);

module.exports = app;
