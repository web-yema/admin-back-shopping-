let formidable = require("formidable");
const path = require("path");
let urls = 'http://127.0.0.1:3088'
const fs = require('fs')
const {
    HomeBanner,
    RemoveBanner
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

exports.Removebanner = (req, res) => {

    let image = req.body.response.image || req.body.image;
    // 删除数据库
    RemoveBanner({
        image
    }, (data) => {
        if (data.n === 1 && data.deletedCount === 1) {
            //  删除文件
            let str = `public${image.match(/http:\/\/127.0.0.1:3088(\S*)/)[1]}`
            fs.unlink(str, (err) => {
                if (err) {
                    return res.json({
                        code: 20000,
                        data: "error",
                        message: "删除失败"
                    });
                }
                res.json({
                    code: 20000,
                    data: "success",
                    message: "删除成功"
                });
            })
        } else {
            res.json({
                code: 20000,
                data: "error",
                message: "删除失败"
            });
        }
    })
}