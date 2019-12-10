let formidable = require("formidable");
const path = require("path");
let urls = 'http://127.0.0.1:3088'

const {
    HomeBanner
} = require('../db/home')

exports.Homebanner = (req, res) => {
    let form = new formidable.IncomingForm();
    // 这个路径必须要真实存在
    form.uploadDir = path.resolve("./public/img/homebannar"); // 上传默认路径
    form.keepExtensions = true; // 保留文件后缀名
    // req就是上边的第一个参数
    // 先错误，再字段，后文件
    form.parse(req, (err, fields, files) => {
        // 解析图片路径
        // 通过base获得文件名
        let image = urls + "/img/homebannar/" + path.parse(files.file.path).base;
        let sorts = 0;
        HomeBanner({
            image,
            sorts
        }, (data) => {
            res.json(data);
        })
    });

}