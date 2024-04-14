const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const {
  useIntergral,
  logIntergral,
} = require("../middleware/integral.middleware");
const { upload, download } = require("../controller/common.controll");
const router = new Router({
  prefix: "/common",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.post("/upload", auth, upload);

router.post("/upload1", (ctx) => {
  console.log(ctx.request.files, "vvv");
});

router.post("/download", auth, useIntergral, download, logIntergral);

// router.get("/preview", auth, previewUrl);

// router.get("/preview/normal", previewUrl);

module.exports = router;
