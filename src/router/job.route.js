const Router = require("koa-router");

const { auth } = require("../middleware/auth.middleware");
const { verifyCompanyId } = require("../middleware/job.middleware");
const { useIntergral } = require("../middleware/integral.middleware");
const {
  get,
  add,
  getById,
  update,
  delete: deleteId,
} = require("../controller/job.controll");
const router = new Router({
  prefix: "/job",
});

router.get("/", get);

router.post("/", auth, verifyCompanyId, useIntergral, add);

router.get("/:id", getById);

router.put("/:id", auth, verifyCompanyId, update);

router.post("/delete/:id", auth, verifyCompanyId, deleteId);

module.exports = router;
