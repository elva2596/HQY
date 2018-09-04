const WorkModel = require('../models/work');
const createWork = (req,res)=>{
  const workInfo = req.body
  console.log(workInfo)
  const instanceWork = new WorkModel(workInfo)
  instanceWork.save()
              .then(work=>{
                res.send({
                  status:1,
                  msg:"success",
                  data:''
                })
              })
              .catch(err=>{
                res.send({
                  status:-1,
                  msg:"err",
                  data:err.message.toString()
                })
              })
}
const getWorks = (req,res)=>{
  const page = req.query.page
  if(page==="undefined"){
    WorkModel.find({},{works:0})
              // .skip(page*5)
              // .limit(5)
              .exec()
              .then(works=>{
                res.send({
                  status:1,
                  msg:"success",
                  data:works
                })
              })
              .catch(err=>{
                res.send({
                  status:-1,
                  msg:"err",
                  data:err.message.toString()
                })
              })
        // return
  }else{
    WorkModel.find({},{works:0})
              .skip(page*10)
              .limit(10)
              .exec()
              .then(works=>{
                res.send({
                  status:1,
                  msg:"success",
                  data:works
                })
              })
              .catch(err=>{
                res.send({
                  status:-1,
                  msg:"err",
                  data:err.message.toString()
                })
              })
  }

}

const deleteWork = (req,res)=>{

  WorkModel.remove({_id:req.query.id})
            .then(re=>{
              res.send({
                status:1,
                msg:"success",
                data:''
              })
            })
            .catch(err=>{
              res.send({
                status:-1,
                msg:"err",
                data:err.message.toString()
              })
            })
}
const findWorksById = (req,res)=>{
  WorkModel.findById(req.params.id)
           .exec()
           .then(re=>{
             res.send({
               status:1,
               msg:"success",
               data:re
             })
           })
           .catch((err) => {
             res.send({
               status:-1,
               msg:"err",
               data:err.message.toString()
             })
           })
}
const updateWork = (req,res)=>{
  WorkModel.update({_id:req.body._id},req.body)
          .exec()
          .then(re=>{
            console.log(re)
            res.send({
              status:1,
              msg:"success",
              data:""
            })
          })
          .catch(err=>{
            res.send({
              status:-1,
              msg:"err",
              data:err.message.toString()
            })
          })
}
module.exports = {
  createWork,
  getWorks,
  deleteWork,
  findWorksById,
  updateWork
}
