// 路由模块
const express = require("express");
const admin = require("./routes/admin");
// const admins = require("./routes/admin");

let router = express.Router();
router
  // 登录
  .post("/login", admin.Login)
  .get("/info", admin.GetInfo)
  .post("/logout", admin.Logout)

  // 注册
  .post("/register", admin.Register)

module.exports = router;