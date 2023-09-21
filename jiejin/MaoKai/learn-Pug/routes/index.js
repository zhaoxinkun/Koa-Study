const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// get返回文本
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
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



module.exports = router
