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


//  多中间件，也可以用来鉴权
//  编写中间件
const auth = async (ctx, next) => {
    if (ctx.url !== "/users") {
        ctx.throw(401)
    }
    await next()
}

// 编写路由
//  实例对象.请求方式("路由位置", (中间件参数) => {
//      操作
//  })

router.get("/", auth, (ctx) => {
    ctx.body = "这是主页"
})


//然后替换上就可以了
usersRouter.get("/", auth, (ctx) => {
    ctx.body = "这是用户列表"
})
usersRouter.post("/", auth, (ctx) => {
    ctx.body = "这是创建用户"
})

//  处理URL参数
usersRouter.get("/:id", auth, (ctx) => {
    ctx.body = `这是用户${ctx.params.id}`
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