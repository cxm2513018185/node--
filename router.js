/**
 * 路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('./service');

// 主页面
router.get('/', service.showIndex);
// 跳转到添加页面
router.get('/toAddBook', service.toAddBook);
// 添加页面（表单提交数据）
router.post('/addBook', service.addBook);
// 跳转到编辑页面
router.get('/toEditBook', service.toEditBook);
// 编辑页面（表单提交数据）
router.post('/editBook', service.editBook);
// 删除图书信息
router.get('/deleteBook', service.deleteBook);

module.exports = router;