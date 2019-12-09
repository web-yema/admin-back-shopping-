let mongoose = require('mongoose')
let {
    db_url
} = require('./mongo')

mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let homeBanner = new mongoose.Schema({
    image: String,
    sorts: String


}, {
    collection: 'loop'
})

let Banner = mongoose.model('loop', homeBanner)

exports.HomeBanner = (data, callback) => {
    Banner.create(data).then(times => {
        callback({
            code: 20000,
            data: "success",
            message: "上传成功"
        })
    })
}