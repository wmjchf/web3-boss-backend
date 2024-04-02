const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");

const { get, add, getApplyByUid } = require("../controller/apply.controll");

const router = new Router({
  prefix: "/apply",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/list", auth, get);

router.post("/", auth, add);

router.get("/", auth, getApplyByUid);

module.exports = router;
