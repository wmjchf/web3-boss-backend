const Router = require("koa-router");

const { getList } = require("../controller/integral.controll");

const router = new Router({
  prefix: "/integral",
});

router.get("/list", getList);

module.exports = router;
