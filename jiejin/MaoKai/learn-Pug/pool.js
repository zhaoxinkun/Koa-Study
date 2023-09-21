const mysql = require('mysql2/promise')

// 注意修改成你的连接信息
const config = {
    database: 'koadb',  // 数据库
    user: 'root',   // 用户
    password: 'root', // 密码
    port: '3306',       // MySQL端口号
    host: 'localhost'   // MySQL地址
}

const pool = mysql.createPool(config)

module.exports = pool
