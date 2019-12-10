const { select, deletes, updates } = require("../db/customer.js")

// 查询客户
exports.Selectcustomer = (req, res) => {
  let data = req.body
  select(data, item => {
    if (Object.keys(item).length === 0) {
      res.json({
        code: 20000,
        msg: "暂无数据"
      })
      return false
    }
    try {
      res.json({
        code: 20000,
        msg: item
      })
    }
    catch {
      res.json({
        code: 20010,
        msg: "查询失败"
      })
    }
  })
}

// 删除客户
exports.Deletecustomer = (req, res) => {
  let _id = req.body._id
  deletes({_id: _id}, item => {
    if (item.n === 0 && item.deletedCount === 0) {
      res.json({
        code: 20001,
        msg: "没有当前项"
      })
      return false
    }
    try {
      res.json({
        code: 20000,
        msg: "删除成功"
      })
    }
    catch {
      res.json({
        code: 20010,
        msg: "删除失败"
      })
    }
  })
}

// 修改客户信息
exports.Updatecustomer = (req, res) => {
  let _id = req.body._id
  let { obj } = req.body
  updates(_id, obj, item => {
    if (item.n === 0 && item.ok === 0) {
      res.json({
        code: 20001,
        msg: "修改失败"
      })
      return false
    }
    try {
      res.json({
        code: 20000,
        msg: "修改成功"
      })
    }
    catch {
      res.json({
        code: 20010,
        msg: "修改失败"
      })
    }
  })
}
