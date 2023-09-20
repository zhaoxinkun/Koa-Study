//引入
const Koa = require("koa")
//安装完koa-router后，引入
const Router = require("koa-router")

// 实例化
const app = new Koa();

// 路由实例化
const router = new Router();


// 编写路由
//  实例对象.请求方式("路由位置", (中间件参数) => {
//      操作
//  })

router.get("/", (ctx) => {
    ctx.body = "这是主页"
})

router.get("/users", (ctx) => {
    ctx.body = "这是用户列表"
})
router.post("/users", (ctx) => {
    ctx.body = "这是创建用户"
})

//  处理URL参数
router.get("/users/:id", (ctx) => {
    ctx.body = `这是用户${ctx.params.id}`
})


//  注册进app实例中
app.use(router.routes())

//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/