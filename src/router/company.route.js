const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/company.middleware");
const { get, add, getById } = require("../controller/company.controll");
const router = new Router({
  prefix: "/company",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", get);

router.post("/", auth, validator, add);

router.get("/:id", getById);

module.exports = router;
