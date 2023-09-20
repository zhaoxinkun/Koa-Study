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
// (ctx) => {
//     //往body中添加
//     db.push(ctx.request.body);
//     ctx.body = ctx.request.body;
// }



//  删除
router.delete("/:id", deleteSome)
// (ctx) => {
//     db.splice(ctx.params.id * 1, 1)
//     ctx.state = 204
// }


//  修改
router.put("/:id", updata)
//  (ctx) => {
//      db[ctx.params.id * 1] = ctx.request.body;
//      ctx.body = ctx.request.body
//  }




//查  --获取列表
router.get("/", getAll)
//  (ctx) => {
//      ctx.body = db
//  }



//  获取特定用户
router.get("/:id", getSomeOne)
// (ctx) => {
//     //  拿到db索引，转化为数字就行了
//     ctx.body = db[ctx.params.id * 1]
//     //  ctx.set("Allow", "GET,POST")
// }


// 最后导出
module.exports = router