const Router = require("koa-router");

const { get } = require("../controller/wx.controll");
const { getAccessToken, getTicket } = require("../middleware/wx.middleware");

const router = new Router({
  prefix: "/wx",
});

// router.post("/register", userValidator, verifyUser, crpyt, register);

router.get("/ticket", getAccessToken, getTicket, get);

module.exports = router;
