// // 1.引入管理员模块
// const admin = require("../db/admin");
// // jwt 加密文件
let jwt = require("jsonwebtoken");
// // let formidable = require("formidable");
// // const path = require("path");
let {
    Registers,
    Logins
} = require('../db/admin')
// 邮箱验证
const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// 注册
exports.Register = (req, res) => {
    let {
        adminName,
        pass,
        password,
        email
    } = req.body
    // 用户名是否为空
    if (adminName === '') {
        return res.json({
            code: 2000,
            data: "warning",
            message: "请输入用户名"
        });
    }
    if (pass === '') {
        return res.json({
            code: 20000,
            data: "warning",
            message: "请输入密码"
        })

    }
    if (pass.length < 6) {
        return res.json({
            code: 20000,
            data: "error",
            message: "密码长度不能小于6位"
        })
    }
    // 两次密码是否一样
    if (pass !== password) {
        return res.json({
            code: 20000,
            data: "error",
            message: "两次输入密码不一致"
        })
    }
    // 邮箱验证

    if (!reg.test(email)) {
        return res.json({
            code: 20000,
            data: "error",
            message: "请输入正确邮箱地址"
        })
    }
    let avatar = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3433392790,4042869198&fm=26&gp=0.jpg'
    Registers({
        ...req.body,
        avatar
    }, (data) => {
        res.json(data)
    })
}

// 登录
exports.Login = (req, res) => {
    const {
        username,
        password
    } = req.body;
    let data = {}
    if (reg.test(username)) {
        data = {
            email: username
        }
    } else {
        data = {
            adminName: username
        }
    }
    Logins(data, (datas) => {
        if (datas.length == 0) {
            return res.json({
                code: 60204,
                message: "该用户未注册"
            });
        }
        if (datas[0].password !== password) {
            return res.json({
                code: 201,
                message: "密码不正确"
            })
        }
        res.json({
            code: 20000,
            data: {
                token: jwt.sign({
                    username: datas[0].adminName
                }, "abcd", {
                    // 过期时间
                    expiresIn: "1h"
                })
            },
            msg: "登录成功"
        });
    })
}

// 获取当前登录用户信息

exports.GetInfo = (req, res) => {

    jwt.verify(req.query.token, "abcd", function (err, decode) {
        if (err) {
            res.json({
                code: 5005,
                data: "success",
                message: "登录时间已过期，请重新登录"
            });
        } else {
            Logins({
                adminName: decode.username
            }, (data) => {
                if (data.length) {
                    res.json({
                        code: 20000,
                        data: {
                            roles: [data[0].adminName],
                            introduction: `I am an ${data[0].adminName}`,
                            avatar: data[0].avatar,
                            name: data[0].adminName,
                            token: jwt.sign({
                                username: data[0].adminName
                            }, "abcd", {
                                // 过期时间
                                expiresIn: "1h"
                            })
                        }
                    });
                } else {
                    res.json({
                        code: 50008,
                        message: "登录失败，无法获取用户详细信息"
                    });
                }
            });
        }
    });
}


// 


// 退出登录
exports.Logout = (req, res) => {
    res.json({
        code: 20000,
        data: "success"
    });
}