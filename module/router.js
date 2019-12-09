// 路由模块
const express = require("express");
const admin = require("./routes/admin");
const home = require("./routes/home");

let router = express.Router();
router
  // 登录
  .post("/login", admin.Login)
  .get("/info", admin.GetInfo)
  .post("/logout", admin.Logout)

  // 注册
  .post("/register", admin.Register)
  // 首页轮播图
  .post('/homebanner', home.Homebanner)

module.exports = router;