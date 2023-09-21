const router = require('koa-router')()
const pool = require("../pool")

router.prefix("/sql")

/*
 * 新增用户
 */
router.post('/addUser', async (ctx, next) => {
    const { name, password, level } = ctx.request.body
    let conn
    try {
        if (!name || !password || !level) {
            throw new Error('缺少参数')
        }
        // 获取新id
        const idSQL = 'SELECT COALESCE(MAX(id), 0) + 1 AS id FROM USER'
        const [[{ id }]] = await pool.query(idSQL)
        // 获取MySQL连接
        conn = await pool.getConnection()
        await conn.beginTransaction()

        const userSQL = conn.format('INSERT INTO USER (id, name, level) VALUES (?, ?, ?)', [id, name, level])
        const pwdSQL = conn.format('INSERT INTO PWD (id, name, password) VALUES (?, ?, ?)', [id, name, password])

        await conn.query(userSQL)
        await conn.query(pwdSQL)
        // 提交事务
        await conn.commit()
        // 释放MySQL连接
        conn.release()
        ctx.body = `增加用户成功，id: ${id}，name: ${name}`
    } catch (e) {
        if (conn) {
            await conn.rollback()
            conn.release()
        }
        ctx.body = e.message
    }
})

// 增加
router.get('/getUser', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

// 改变
router.get('/changUserPassword', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

// 删除
router.get("/deleteUser", async (ctx, next) => {
    const { size } = ctx.query
    ctx.body = `您的size参数是 ${size}`
})

module.exports = router
