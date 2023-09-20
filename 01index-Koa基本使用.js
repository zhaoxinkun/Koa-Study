//引入
const Koa = require("koa");

// 实例化
const app = new Koa();

// 使用use方法  一个函数(中间件) 参数
app.use((ctx) => {
    ctx.body = "Hello world";
});

//  设置监听端口
app.listen(1314);

// 启动
// node index.js

//  测试
// 浏览器输入 http://localhost:端口号/
