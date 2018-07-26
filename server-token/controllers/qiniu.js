const formidable = require('formidable');
const upload = require('../utils');
const path = require("path")
const addImg = (req,res)=>{

  /**
   * [查询字符串]
   * @type {String}
   * 0:作品栏
   * 1:展览
   * 2：出版物
   */
  const form = new formidable.IncomingForm();
  const baseDir = form.uploadDir = path.join(__dirname,"../imgs");//作为暂时的文件存储
  form.parse(req,(err,fields,files)=>{
    upload(req.query.type,baseDir,files.file.path,files.file.name)
    .then(imgUrl=>{
      res.send({
        status:1,
        msg:'success',
        data:imgUrl
      })
    })
    .catch(err=>{
      res.send({
        status:0,
        msg:"err",
        data:err.message.toString()
      })
    })

  })
}
module.exports = addImg
