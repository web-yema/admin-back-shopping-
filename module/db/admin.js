let mongoose = require('mongoose')
let {
  db_url
} = require('./mongo')
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let adminSchema = new mongoose.Schema({
  adminName: String,
  email: String,
  password: String,
  avatar: String,
  power: String

}, {
  collection: 'adminBack'
})

let Admin = mongoose.model('adminBack', adminSchema)

exports.Logins = (data, callback) => {
  Admin.find(data).then(item => {
    callback(item)
  })
}

exports.Registers = (data, callback) => {

  Admin.find({
    adminName: data.adminName
  }).then(item => {
    if (item.length > 0) {
      return callback({
        code: 20000,
        data: "warning",
        message: "用户名已存在"
      })
    }
    Admin.find({
      email: data.email
    }).then(datas => {
      if (datas.length > 0) {
        return callback({
          code: 20000,
          data: "warning",
          message: "邮箱已存在"
        })
      }
      Admin.create(data).then(times => {
        return callback({
          code: 20000,
          data: "success",
          message: "注册成功"
        })
      })
    })
  })
}