const AdminModel = require("../models/admin")
const moment = require("moment");
const objectIdToStamp = require("objectid-to-timestamp")
class Admin{
  async register(req,res){
    let {name,password} = req.body
    let userRegister = new AdminModel({
      name,
      password,
    })
    userRegister.create_time = moment(objectIdToStamp(userRegister._id)).format("YYYY-MM-DD HH:mm:ss")
  }
}
