 //引入koa框架
 const Koa = require("koa")

 // 引入body解析中间件koa-bodyparser
 const bodyParser = require("koa-bodyparser")

 // 引入自定义自动化注册目录
 const routing = require("./routes")


 // 引入错误处理中间件
 const error = require('koa-json-error')

 //  引入参数校验中间件
 const parmeter = require('koa-parameter')


 //  引入mongoose链接数据库
 const mongoose = require('mongoose')
 //  隐藏账号信息
 const {
     connectionStr
 } = require("./config")
 //  链接数据库
 mongoose.connect(connectionStr)
 //  打印错误信息
 mongoose.connection.on("error", console.error)


 // 实例化
 const app = new Koa();

 // 批量添加
 routing(app);

 //  直接使用，这一部分是配置开发者环境的检验的
 app.use(error({
     postFormat: (e, {
         stack,
         ...rest
     }) => process.env.NODE_ENV === 'production' ? rest : {
         stack,
         ...rest
     }
 }))

 //  注册一下body解析的中间件
 app.use(bodyParser())

 //  注册,传一个app是不仅可以是一个中间件,还可以添加上下文对象
 app.use(parmeter(app))

 //  设置监听端口
 app.listen(1314, () => console.log("Server is running on port 1314"))

 // 启动
 // node index.js

 //  测试
 // 浏览器输入 http://localhost:端口号/