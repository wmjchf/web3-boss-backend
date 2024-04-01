const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");

const { get, add, adds } = require("../controller/cpicture.controll");

const router = new Router({
  prefix: "/cpicture",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", get);

router.post("/:companyId", auth, adds);

module.exports = router;
