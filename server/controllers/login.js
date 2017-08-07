const bcrypt = require("bcrypt");
const AdminModel = require("../models/admin");
const login = (req,res)=>{
  let {name,password} = req.body;
  AdminModel.findOne({name})
            .exec()
            .then(user=>{
              if(user){
                let {password:hash} = user;
                bcrypt.compare(password,hash)
                      .then((result)=>{
                        if(result){
                            console.log(Object.getOwnPropertyDescriptor(user,"password"))
                            console.log(user);
                            // req.session.userInfo = {};
                            req.session[name] = name
                            res.send({
                                status:1,
                                msg:"ok",
                                data:"登录成功"
                            })
                        }else{
                            res.send({
                                status:0,
                                msg:"err",
                                data:"密码错误"
                            })
                        }
                      })
              }else{
                res.send({status:0,msg:"ok",data:"用户名不存在"})
              }
            })
              .catch((err)=>{
                res.send({
                    status:-1,
                    msg:"server error",
                    data:err.message.toString()
                })
              })
};
module.exports = login;
