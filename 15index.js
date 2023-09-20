 //引入
 const Koa = require("koa")

 // 实例化
 const app = new Koa();
 //安装完koa-router路由中间件后，引入


 //  因为没有数据库，我们暂时用变量进行存储
 const db = [{
     "name": "xiaoxin"
 }];


 const Router = require("koa-router")
 // 路由实例化
 const router = new Router();
 // 编写路由
 //  实例对象.请求方式("路由位置", (中间件参数) => {
 //      操作
 //  })


 // 引入body解析中间件koa-bodyparser，然后去注册
 const bodyparser2 = require("koa-bodyparser")



 //  实例化一个前缀对象
 const usersRouter = new Router({
     prefix: "/users"
 });



 router.get("/", (ctx) => {
     ctx.body = "这是主页"
     ctx.state = 200 //设置响应状态码
 })


 // 增加
 usersRouter.post("/", (ctx) => {
     //往body中添加
     db.push(ctx.request.body);
     ctx.body = ctx.request.body;
 })
 //  删除
 usersRouter.delete("/:id", (ctx) => {
     db.splice(ctx.params.id * 1, 1)
     ctx.state = 204
 })
 //  修改
 usersRouter.put("/:id", (ctx) => {
     db[ctx.params.id * 1] = ctx.request.body;
     ctx.body = ctx.request.body
 })
 //查  --获取列表
 usersRouter.get("/", (ctx) => {
     ctx.body = db
 })
 //  获取特定用户
 usersRouter.get("/:id", (ctx) => {
     //  拿到db索引，转化为数字就行了
     ctx.body = db[ctx.params.id * 1]
     //  ctx.set("Allow", "GET,POST")
 })




 //  将路由注册进app实例中
 app.use(router.routes());
 //  再注册一下自己的实例化对象
 app.use(usersRouter.routes())

 // 编写allowedMethods  ,相应options的预检请求
 app.use(usersRouter.allowedMethods())


 //  注册一下body解析的中间件
 app.use(bodyparser2())

 //  设置监听端口
 app.listen(1314)

 // 启动
 // node index.js

 //  测试
 // 浏览器输入 http://localhost:端口号/