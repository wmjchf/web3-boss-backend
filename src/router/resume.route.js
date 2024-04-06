const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");

const { get, add, delete: deleteId } = require("../controller/resume.controll");

const router = new Router({
  prefix: "/resume",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", auth, get);

router.post("/", auth, add);

router.post("/delete/:id", auth, deleteId);

module.exports = router;
