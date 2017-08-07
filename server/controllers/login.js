const bcrypt = require("bcrypt");
const AdminModel = require("../models/admin");
const login = (req,res)=>{
  let {name} = req.body;
  AdminModel.findOne({name})
            .exec()
            .then(user=>{
              if(user){
                let {name,password} = user
              }else{
                res.send({status:0,msg:"ok",data:"用户名不存在"})
              }
            })


}
