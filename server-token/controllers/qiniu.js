const formidable = require('formidable');
const qiniu  = require('qiniu');
const path = require("path")
const fs = require('fs');
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z1;

const createToken = ()=>{

  const mac = new qiniu.auth.digest.Mac(process.env.ACCESS_KEY,process.env.SECRET_KEY)
  const ops = {scope:process.env.BUCKET}

  return  new qiniu.rs.PutPolicy(ops).uploadToken(mac)
}

const addImg = (req,res)=>{
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname,"../imgs");
  // console.log(path.resolve(__dirname,"../imgs"))
  form.keepExtensions = true
  form.parse(req,(err,fields,files)=>{
    let path = files.file.path.split(/\\/)
    let imgName = path.pop()
    let token = createToken()
    fs.rename(form.uploadDir+`/${imgName}`,form.uploadDir+`/${files.file.name}`,function (){
      var formUploader = new qiniu.form_up.FormUploader(config);
      var putExtra = new qiniu.form_up.PutExtra();
      formUploader.putFile(token, files.file.name, form.uploadDir+`/${files.file.name}`, putExtra, function(err, ret) {
      	    if(!err) {
      	    	console.log(ret.key)
              fs.unlink(form.uploadDir+`/${files.file.name}`)
              res.send({
                name:"dailu",
                key:ret.key,

              })
      	    } else {
      	    	console.log('图片上传至七牛失败', err);
      	    	// reject(err)
      	    }
        	});


    })

  })

}
module.exports = addImg
