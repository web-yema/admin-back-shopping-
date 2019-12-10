const { db_url } = require("./mongo.js")
const mongoose = require("mongoose")

// 建立连接
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// 建表格式
let customerSchema = new mongoose.Schema(
  {
    date: String,
    name: String,
    phone: String,
    address1: String,
    address2: String,
    order: String
  },
  {
    collection: "customerBack"
  }
);
// 连接表
let customers = mongoose.model("customerBack", customerSchema);

// 查询客户
exports.select = (data, callback) => {
  // customers.create(data).then(item=>{
  //   console.log(item)
  // })
  customers.find(data).then(item => {
    callback(item)
  })
}

// 删除客户
exports.deletes = (data, callback) => {
  customers.remove(data).then(item => {
    callback(item)
  })
}
// 修改客户信息
exports.updates = (_id, data, callback) => {
  customers.update({_id: _id}, data).then(item => {
    callback(item)
  })
}
