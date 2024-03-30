const Router = require("koa-router");
const {
  userValidator,
  verifyUser,
  crpyt,
} = require("../middleware/user.middleware");
const { register, login } = require("../controller/user.controll");
const router = new Router({
  prefix: "/user",
});

router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/login", login);

module.exports = router;
