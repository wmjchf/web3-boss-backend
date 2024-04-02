const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { verifyCompanyId } = require("../middleware/job.middleware");
const { get, add, getById, update } = require("../controller/job.controll");
const router = new Router({
  prefix: "/job",
});

router.get("/", get);

router.post("/", auth, verifyCompanyId, add);

router.get("/:id", getById);

router.put("/:id", auth, verifyCompanyId, update);

module.exports = router;
