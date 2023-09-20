 //引入
 const Koa = require("koa")

 // 引入body解析中间件koa-bodyparser，然后去注册
 const bodyparser = require("koa-bodyparser")

 // 实例化
 const app = new Koa();
 //安装完koa-router路由中间件后，引入

 // 引入目录
 const routing = require("./routes")
 // 批量添加
 routing(app)

 // 引入错误处理中间件
 const error = require('koa-json-error')


 //  直接使用
 app.use(error({
     postFormat: (e, {
         stack,
         ...rest
     }) => process.env.NODE_ENV === 'production' ? rest : {
         stack,
         ...rest
     }
 }))
 //  // 编写错误处理中间件
 //  app.use(async (ctx, next) => {
 //      try {
 //          await next();
 //      } catch (err) {
 //          ctx.status = err.status || err.statusCode || 500;
 //          ctx.body = {
 //              message: err.message
 //          };
 //      }
 //  });

 //  注册一下body解析的中间件
 app.use(bodyparser())


 //  设置监听端口
 app.listen(1314, () => console.log("程序已启动在1314端口"))

 // 启动
 // node index.js

 //  测试
 // 浏览器输入 http://localhost:端口号/