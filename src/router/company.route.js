const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { validator, isOwner } = require("../middleware/company.middleware");
const { get, add, getById, update } = require("../controller/company.controll");
const router = new Router({
  prefix: "/company",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/", get);

router.post("/", auth, validator, add);

router.get("/:id", getById);

router.put("/:id", auth, validator, isOwner, update);

module.exports = router;
