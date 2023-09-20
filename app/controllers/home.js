class HomeCtl {
    // 这里写的是类
    index() {
        ctx.body = "这里是主页"
    }
}


// 最好实例化一下，不然用的都是一个
module.exports = new HomeCtl();