const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { get, add } = require("../controller/company.controll");
const router = new Router({
  prefix: "/company",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", get);

module.exports = router;
