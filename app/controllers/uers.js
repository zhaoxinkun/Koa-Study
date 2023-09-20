// 访问自己的数据库模型
const User = require("../models/users")

class userCtl {
    // 增加
    async add(ctx) {
        ctx.verifyParams({
            name: {
                type: 'string',
                required: true
            },
            age: {
                type: "number",
                required: true
            }
        })
        const user = await new User(ctx.request.body).save();
        ctx.body = user;
    }

    // 删除
    deleteSome(ctx) {
        db.splice(ctx.params.id * 1, 1)
        ctx.state = 204
    }
    // 更新
    // updata
    updata(ctx) {
        db[ctx.params.id * 1] = ctx.request.body;
        ctx.body = ctx.request.body
    }

    // 获取全部
    async getAll(ctx) {
        // a.b //创造500错误
        // ctx.body = db
        ctx.body = await User.find();

    }
    // 获取特定用户
    async getSomeOne(ctx) {
        // 抛出412先决条件失败错误
        // if (ctx.params.id * 1 >= db.length) {
        //     ctx.throw(412, "先决条件错误：id大于长度了")
        // }
        //  拿到db索引，转化为数字就行了
        // ctx.body = db[ctx.params.id * 1]
        //  ctx.set("Allow", "GET,POST")
        const user = await User.getSomeOne(ctx.params.id)
        if (!user) {
            ctx.throw(404, "您查询的用户不存在")
        }
        ctx.body = user

    }
}


module.exports = new userCtl()