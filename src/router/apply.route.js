const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { useIntergral } = require("../middleware/integral.middleware");

const {
  get,
  add,
  getApplyByUserId,
  update,
} = require("../controller/apply.controll");

const router = new Router({
  prefix: "/apply",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/list", auth, get);

router.post("/", auth, useIntergral, add);

router.put("/:id", auth, update);

// router.get("/:id", auth, getApplyByUserId);

router.get("/", auth, getApplyByUserId);

module.exports = router;
