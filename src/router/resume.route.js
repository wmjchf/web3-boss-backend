const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");

const { get, add } = require("../controller/resume.controll");

const router = new Router({
  prefix: "/resume",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", auth, get);

router.post("/", auth, add);

module.exports = router;
