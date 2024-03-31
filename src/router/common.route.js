const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { upload } = require("../controller/common.controll");
const router = new Router({
  prefix: "/common",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/upload", upload);

module.exports = router;
