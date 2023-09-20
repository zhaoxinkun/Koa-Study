// // 批量注册路由文件

// // 引入内置模块
// const fs = require("fs")
// module.exports = (app) => {
//     // 遍历读取文件名
//     fs.readFileSync(__dirname).forEach(file => {
//         // 掠过index.js
//         if (file === "index.js") {
//             return;
//         }
//         // 否则的话就引入文件
//         const route = require(`./${file}`);
//         // 然后注册
//         app.use(route.routes()).use(route.allowMethods())
//     })
// }



const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    // 遍历读取文件名
    fs.readdirSync(__dirname).forEach(file => {
        // 获取文件的完整路径
        const filePath = path.join(__dirname, file);
        // 掠过index.js和子目录
        if (file === "index.js" || fs.lstatSync(filePath).isDirectory()) {
            return;
        }
        // 否则的话就引入文件
        const route = require(`./${file}`);
        // 然后注册
        app.use(route.routes()).use(route.allowedMethods());
    });
};