//引入
const Koa = require("koa")

// 实例化
const app = new Koa();

// 使用use方法  一个函数(中间件) 参数
//  中间件
app.use(async (ctx) => {
    // 判断URl的方法
    if (ctx.url === "/") {
        ctx.body = "这里是主页"
    } else if (ctx.url === "/users") {
        if (ctx.method === "GET") {
            ctx.body = "这里是用户页"
        } else if (ctx.method === "POST") {
            ctx.body = "创建用户"
        } else {
            ctx.status = 405
        }
    } else {
        //  返回的状态码
        ctx.status = 404
    }
})


//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/