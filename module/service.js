// 1.引入管理员模块
const admin = require("./db/admin");
// jwt 加密文件
let jwt = require("jsonwebtoken");
let formidable = require("formidable");
const path = require("path");

// 登录
exports.LoginHandle = (req, res) => {
  let body = req.body;
  admin.login(body, result => {
    if (result.length != 0) {
      res.json({
        code: 20000,
        data: {
          vip: result[0].vip,
          token: jwt.sign({
              username: result[0].username
            },
            "abcd", {
              // 过期时间
              expiresIn: "1h"
            }
          )
        }
      });
    } else {
      res.json({
        code: 60204,
        message: "密码错误或者用户名不充在"
      });
    }
  });
};

// 获取用户信息
exports.Getadmin = (req, res) => {
  jwt.verify(req.query.token, "abcd", function (err, decode) {
    // console.log(decode);
    if (err) {
      res.json({
        code: 5005,
        data: "success",
        message: "用户未登录"
      });
    } else {
      let usernameId = decode.username;
      admin.findBiao({
          usernameId
        },
        datas => {
          //   console.log(datas);

          if (datas.length != 0) {
            // console.log(datas);
            res.json({
              code: 20000,
              data: {
                roles: [datas[0].vip],
                introduction: `I am an ${datas[0].username}`,
                avatar: datas[0].portrait,
                name: `${datas[0].username}`,
                vip: `${datas[0].vip}`,
                token: jwt.sign({
                    username: datas[0].usernameId
                  },
                  "abcd", {
                    // 过期时间
                    expiresIn: "1h"
                  }
                )
              }
            });
          } else {
            res.json({
              code: 50008,
              message: "登录失败"
            });
          }
        }
      );
    }
  });
};

// 退出登录
exports.Logout = (req, res) => {
  res.json({
    code: 20000,
    data: "success"
  });
};


// 获取当前登录用户信息
app.get("/getadmin", (req, res) => {
  jwt.verify(req.query.token, "abcd", function (err, decode) {
    if (err) {
      res.json({
        code: 5005,
        data: "success",
        message: "登录时间已过期，请重新登录"
      });
    } else {
      Admin.findOne({
        adminName: decode.username
      }, (err, ret) => {
        if (err) {
          return console.log("查询失败");
        }
        if (ret) {
          res.json({
            code: 20000,
            data: {
              roles: [ret.power],
              introduction: `I am an ${ret.adminName}`,
              avatar: ret.avatar,
              name: ret.adminName,
              id: ret._id,
              loginFlag: ret.loginFlag,
              token: jwt.sign({
                username: ret.adminName
              }, "abcd", {
                // 过期时间
                expiresIn: "1h"
              })
            }
          });
        } else {
          ress.json({
            code: 50008,
            message: "Login failed, unable to get user details."
          });
        }
      });
    }
  });
});
// 登录
app.post("/login", (req, ress) => {
  const {
    username,
    password
  } = req.body;
  Admin.findOne({
    adminName: username
  }, (err, ret) => {
    if (err) {
      return console.log("查询失败");
    }
    if (ret) {
      const {
        adminName
      } = ret;
      if (ret.password === password)
        return ress.json({
          code: 20000,
          data: {
            token: jwt.sign({
              username: adminName
            }, "abcd", {
              // 过期时间
              expiresIn: "1h"
            })
          },
          msg: "登录成功"
        });
      ress.json({
        code: 201,
        message: "密码不正确"
      });
    } else {
      ress.json({
        code: 60204,
        message: "该用户未注册"
      });
    }
  });
});
// 退出登录
app.post("/logout", (req, res) => {
  res.json({
    code: 20000,
    data: "success"
  });
});