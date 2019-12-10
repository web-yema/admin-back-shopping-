// 路由模块
const express = require("express");
const admin = require("./routes/admin");
const home = require("./routes/home");
const customer = require("./routes/customer")

let router = express.Router()
router
  // 登录
  .post("/login", admin.Login)
  .get("/info", admin.GetInfo)
  .post("/logout", admin.Logout)

  // 注册
  .post("/register", admin.Register)
  // 首页轮播图
  .post('/homebanner', home.Homebanner)
  // 查询客户
  .post("/selectcustomer", customer.Selectcustomer)
  // 删除客户
  .post("/deletecustomer", customer.Deletecustomer)
  // 修改客户信息
  .post("/updatecustomer", customer.Updatecustomer)

module.exports = router
