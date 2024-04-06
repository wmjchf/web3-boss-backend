const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { upload, previewUrl } = require("../controller/common.controll");
const router = new Router({
  prefix: "/common",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/upload", auth, upload);

router.get("/preview", auth, previewUrl);

router.get("/preview/normal", previewUrl);

module.exports = router;
