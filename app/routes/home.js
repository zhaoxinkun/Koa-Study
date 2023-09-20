// 这里是根路由的配置

// 首先引入路由模块
const Router = require("koa-router")

// 然后实例化路由对象
const router = new Router();


// 导入属于自己的控制器
// const homeCtl = require("../controllers/home")
// 或者解构出来
const {
    index
} = require("../controllers/home")


// 然后放进来最根本的
router.get("/", index)


// 然后导出
module.exports = router;