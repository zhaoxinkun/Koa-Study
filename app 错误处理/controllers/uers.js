//  因为没有数据库，我们暂时用变量进行存储
const db = [{
        "name": "xiaoxin"
    },
    {
        "name": "xiaoxin2"
    }
];

class userCtl {
    // 增加
    add(ctx) {

        db.push(ctx.request.body);
        ctx.body = ctx.request.body;
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
    getAll(ctx) {
        // a.b //创造500错误
        ctx.body = db

    }
    getSomeOne(ctx) {
        // 抛出412先决条件失败错误
        if (ctx.params.id * 1 >= db.length) {
            ctx.throw(412, "先决条件错误：id大于长度了")
        }
        //  拿到db索引，转化为数字就行了
        ctx.body = db[ctx.params.id * 1]
        //  ctx.set("Allow", "GET,POST")

    }
}


module.exports = new userCtl()