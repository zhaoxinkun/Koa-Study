//引入
const Koa = require("koa")

// 实例化
const app = new Koa();
//安装完koa-router路由中间件后，引入



const Router = require("koa-router")
// 路由实例化
const router = new Router();
// 编写路由
//  实例对象.请求方式("路由位置", (中间件参数) => {
//      操作
//  })


// 引入body解析中间件koa-bodyparser，然后去注册
const bodyparser = require("koa-bodyparser")





//  实例化一个前缀对象
const usersRouter = new Router({
    prefix: "/users"
});





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
    }],
        ctx.set("Allow", "GET,POST")
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
//  获取特定用户
usersRouter.get("/:id", (ctx) => {
    ctx.body = [{
        name: "xiaohua2"
    }]
    //  ctx.set("Allow", "GET,POST")
})




//  将路由注册进app实例中
app.use(router.routes());
//  再注册一下自己的实例化对象
app.use(usersRouter.routes())

// 编写allowedMethods  ,相应options的预检请求
app.use(usersRouter.allowedMethods())


//  注册一下body解析的中间件
app.use(bodyparser())

//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/