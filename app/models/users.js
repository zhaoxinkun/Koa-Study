// 引入mongoose
const mongoose = require("mongoose")

// 结构出Schema
const {
    Schema,
    model
} = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
})


// 建造模型
module.exports = model("User", userSchema)