const router = require('koa-router')()
const pool = require("../pool")

router.prefix("/sql")

/*
 * 新增用户
 */
router.post('/addUser', async (ctx, next) => {
    const { name, password, level } = ctx.request.body
    try {
        if (!(name && password && level)) {
            throw '缺少参数'
        }
        // 获取新id
        const idSQL = 'SELECT	COALESCE( max( id ), 0 ) + 1 id FROM USER'
        const [[{ id }]] = await pool.query(idSQL)
        // 获取MySQL连接
        const conn = await pool.getConnection()
        await conn.beginTransaction()

        const userSQL = pool.format('INSERT INTO USER ( id, name, level ) VALUES( ?, ?, ? )', [id, name, level])
        const pwdSQL = pool.format('INSERT INTO PWD ( id, name, password ) VALUES( ?, ?, ? )', [id, name, password])

        await conn.query(userSQL)
        await conn.query(pwdSQL)
        // 提交事务
        await conn.commit()
        // 释放MySQL连接
        conn.release()
        ctx.body = `增加用户成功,id:${id},name:${name}`
    } catch (e) {
        conn.rollback()
        ctx.body = e
    }
})

/*
 * 查询信息
 */
router.get('/getUser/:id', async (ctx, next) => {
    const { id } = ctx.params
    try {
        if (!id) {
            throw '缺少参数'
        }
        const userSQL = pool.format('SELECT * FROM USER WHERE ID = ?', [id])
        const [rows] = await pool.query(userSQL)
        const { name, level } = rows[0]
        ctx.body = `用户信息：\n id:${id}\n name:${name}\n level:${level}`
    } catch (e) {
        ctx.body = e
    }
})

/*
 * 修改密码
 */
router.post('/changPassword', async (ctx, next) => {
    const { id, password, newPassword } = ctx.request.body
    try {
        if (!(id && password && newPassword)) {
            throw '缺少参数'
        }
        const pwdSQL = pool.format('SELECT password current FROM PWD WHERE ID = ?', [id])
        const [[{ current }]] = await pool.query(pwdSQL)

        if (password !== current) {
            throw '密码错误，请检查'
        }

        const newPwdSQL = pool.format('UPDATE pwd SET password = ? WHERE ID = ?', [newPassword, id])
        await pool.query(newPwdSQL)

        ctx.body = `id:${id} 密码修改成功, 新密码：${newPassword}`
    } catch (e) {
        ctx.body = e
    }
})
/*
 * 删除用户
 */
router.get('/deleteUser/:id', async (ctx, next) => {
    const { id } = ctx.params
    try {
        if (!id) {
            throw '缺少参数'
        }
        const userSQL = pool.format('SELECT * FROM USER WHERE ID = ?', [id])
        const [rows] = await pool.query(userSQL)
        const { name, level } = rows[0]
        ctx.body = `用户信息：\n id：${id}\n name:${name}\n level:${level}`
    } catch (e) {
        ctx.body = e
    }
})

module.exports = router
