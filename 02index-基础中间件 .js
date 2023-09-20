//引入
const Koa = require("koa")

// 实例化
const app = new Koa();

// 使用use方法  一个函数(中间件) 参数
app.use(async (ctx, next) => {
    //想要使用下一个中间件，必须使用next搭配async语法糖
    await next();
    console.log("1")
    ctx.body = "Hello world"
})
app.use((ctx2) => { //这个最好也加上
    console.log("2")
    console.log("3")
})
//截止到这里，请求后，输出结果：231231，会请求两次，在浏览器network中发现，图标还发送一次，所以可以直接在浏览器console中输入：fetch('/').then(res=>res.text()).then(console.log)


//  设置监听端口
app.listen(1314)

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/