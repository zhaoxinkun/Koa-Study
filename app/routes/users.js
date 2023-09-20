// 这里是关于用户的所有的路由

// 首先引入路由模块
const Router = require("koa-router")

// 然后实例化路由对象，并添加前缀
const router = new Router({
    prefix: "/users"
});


// 引入所需要的控制器
const {
    add,
    deleteSome,
    updata,
    getAll,
    getSomeOne
} = require("../controllers/uers")




// 增加
router.post("/", add)

//  删除
router.delete("/:id", deleteSome)

//  修改
router.put("/:id", updata)

//查  --获取列表
router.get("/", getAll)

//  获取特定用户
router.get("/:id", getSomeOne)

// 最后导出
module.exports = router