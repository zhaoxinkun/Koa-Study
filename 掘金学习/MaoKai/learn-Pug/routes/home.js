
// 自定义home
const router = require('koa-router')()
router.prefix("/home")
router.get('/', async (ctx, next) => {
  // 选择渲染那个模板
  await ctx.render('home', {
    // 传递参数
    title: 'Hello Koa home!'
  })
})

// get返回文本
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 home string'
})

// GET - 返回JSON
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// 带参数的get请求
router.get("/get", async (ctx, next) => {
  const { szie } = ctx.query
  ctx.body = `您的size参数是${szie}`
})


// GET - 路由传参
router.get('/get/:id', async (ctx, next) => {
  const { id } = ctx.params
  ctx.body = `您的id参数是${id}`
})

// POST - 参数
router.post('/juejin', async (ctx, next) => {
  const { name, id } = ctx.request.body
  ctx.body = {
    name: `您的用户名是${name}`,
    id: `${id}`,
  }
})

// 渲染列表
router.get('/who', async (ctx, next) => {
  await ctx.render('home', {
    word: ["01", "01", "01", "01"],
    age: "18"
  })
})



module.exports = router
