// 管理系统
//  入口文件

const express = require("express");
const path = require("path");
const router = require("./module/router");
const bodyParser = require("body-parser");
const cors = require("cors");
let app = express();
//挂载参数处理中间件
app.use(cors());
//处理json格式的参数
app.use(bodyParser.json());
// 处理表单数据
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// // 设置静态资源目录
app.use(express.static(path.resolve("./public")));
// 将路由引入
app.use(router);

app.listen(3088, () => {
  console.log("http://localhost:3088");
});