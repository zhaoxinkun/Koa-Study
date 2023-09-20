//引入
const Koa = require("koa")
//安装完koa-router后，引入
const Router = require("koa-router")


// 实例化
const app = new Koa();

// 路由实例化
const router = new Router();
//  再实例化一个前缀对象
const usersRouter = new Router({
    prefix: "/users"
});



// 编写路由
//  实例对象.请求方式("路由位置", (中间件参数) => {
//      操作
//  })

router.get("/", (ctx) => {
    ctx.body = "这是主页"
})


// 增
usersRouter.post("/", (ctx) => {
    ctx.body = [{
        name: "xiaohua"
    }]
})
//  删
usersRouter.delete("/:id", (ctx) => {
    ctx.state = 204
})
//  改
usersRouter.put("/:id", (ctx) => {
    ctx.body = [{
        name: "xiaohua2"
    }]
})
//查
usersRouter.get("/", (ctx) => {
    ctx.body = [{
        name: "xiaoxin"
    }, {
        name: "xiaoli"
    }, {
        name: " xiaobia"
    }]
})





//  注册进app实例中
app.use(router.routes());
//  再注册一下
app.use(usersRouter.routes())

// 编写allowedMethods  ,相应options的预检请求
app.use(usersRouter.allowedMethods())


//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/