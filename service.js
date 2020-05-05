/**
 * 业务模块
 */
const data = require('./data.json');
const fs = require('fs');
const path = require('path');

// 主页面
exports.showIndex = (req, res) => {
    // .art可不加
    res.render('index.art', {
        list: data
    })
};
// 添加图书页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {});
}
// 添加图书，跳转到列表页
exports.addBook = (req, res) => {
    // 获取表单数据
    let formData = req.body;
    let obj = {};
    obj.id = autoIncrementId() + 1;
    for (let key in formData) {
        obj[key] = formData[key];
    }
    data.push(obj);
    writeFile(res);
}
// 编辑图书页面
exports.toEditBook = (req, res) => {
    let id = req.query.id;
    let book = {};
    data.forEach(item => {
        if (item.id == id) {
            book = item;
            return;
        }
    });
    res.render('editBook', book);
};
// 编辑图书，跳转到列表页
exports.editBook = (req, res) => {
    let formData = req.body;
    data.forEach(item => {
        if (item.id == formData.id) {
            for (let key in formData) {
                item[key] = formData[key];
            }
            return;
        }
    });
    writeFile(res);
}
// 删除图书信息
exports.deleteBook = (req, res) => {
    let id = req.query.id;
    data.forEach((item, i) => {
        if (item.id == id) {
            data.splice(i, 1);
        }
        return;
    });
    writeFile(res);
}


// id自动递增
let autoIncrementId = () => {
    var arr = [];
    data.forEach(item => {
        arr.push(item.id);
    })
    return Math.max(...arr);
}

// 把内存中的数据写入文件
let writeFile = (res) => {
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err) => {
        if (err) {
            res.send("服务器错误，请与管理员取得联系");
            return;
        }
        res.redirect('/');
    })
};