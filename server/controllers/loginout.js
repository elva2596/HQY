
// 想要登出必须先登录
module.exports = (req,res)=>{
  delete req.session.user_id
  res.send({
    status:1,
    msg:"success",
    data:"删除成功"
  })
}
