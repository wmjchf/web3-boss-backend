const Router = require("koa-router");
const {
  userValidator,
  verifyUser,

  verifyShare,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");
const { login, getNonce, getSelf } = require("../controller/user.controll");
const router = new Router({
  prefix: "/user",
});

router.get("/nonce", getNonce);

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/login", userValidator, verifyUser, verifyShare, login);

router.get("/", auth, getSelf);

module.exports = router;
