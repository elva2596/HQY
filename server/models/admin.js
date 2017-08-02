// Schema和Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name:{
    type:String,
    index:true,
    unique:true
  },
  password:String,
  create_time:Date
})
// 创建Model(即集合)
const Admin = mongoose.model("Admin",userSchema);
module.exports = Admin
