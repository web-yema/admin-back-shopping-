// 路由模块
const express = require("express");
const admin = require("./routes/admin");
const home = require("./routes/home");
let router = express.Router();
// 路由
const customer = require("./routes/customer")

router
  // 登录
  .post("/login", admin.Login)
  // 获取用户信息
  .get("/info", admin.GetInfo)
  // 退出
  .post("/logout", admin.Logout)
  // 注册
  .post("/register", admin.Register)
  // 首页轮播图
  .post('/homebanner', home.Homebanner)
  // 首页轮播删除
  .post('/removebanner', home.Removebanner)
  // 查询客户
  .post("/selectcustomer", customer.Selectcustomer)
  // 删除客户
  .post("/deletecustomer", customer.Deletecustomer)
  // 修改客户信息
  .post("/updatecustomer", customer.Updatecustomer)

module.exports = router