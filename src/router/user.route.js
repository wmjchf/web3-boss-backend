const Router = require("koa-router");
const {
  userValidator,
  verifyUser,
  crpyt,
} = require("../middleware/user.middleware");
const { auth } = require("../middleware/auth.middleware");
const { register, login, getNonce } = require("../controller/user.controll");
const router = new Router({
  prefix: "/user",
});

router.get("/nonce", getNonce);

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/login", userValidator, verifyUser, login);

module.exports = router;
