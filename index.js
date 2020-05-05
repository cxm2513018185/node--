/**
 * 图书管理系统
 * 入口文件
 */
const express = require('express');
const bodyParser = require('body-parser');
const template = require('art-template');
const expTemplate = require('express-art-template');
const path = require('path');
const router = require('./router.js');
const app = express();

// 处理post提交过来的参数
// 1.表单格式
app.use(bodyParser.urlencoded({ extended: true }));
// 2.json形式
app.use(bodyParser.json());

// 处理模板
app.set('views', path.join(__dirname, 'public', 'views'));
app.set('view engine', 'art');
app.engine('art', expTemplate);

// 启动静态资源服务
app.use(express.static('public'));

// 配置路由
app.use(router);

// 监听端口
app.listen(3333, () => {
    console.log('server has running on port 3333');
})
