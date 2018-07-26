<template lang="html">
  <el-upload
    class="bio-upload"
    ref="bioUpload"
    :action="actionUrl"
    :before-upload = "beforeUpload"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :file-list="infoFileLists">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <div slot="tip" class="el-upload__tip">请上传您的文件,命名请按照-CN.pdf/-EN.pdf结尾</div>
  </el-upload>
</template>

<script>
export default {
  props:["infoFileLists","actionUrl"],
  methods:{
   handleRemove(file, fileList) {
     this.infoFileLists.forEach((item, index)=> {
       if(item.name===file.name){
         this.infoFileLists.splice(index,1)
       }
     })

   },
   handleSuccess(response, file, fileList){
     this.infoFileLists.push({name:file.name,url:response.data})
   },
   beforeUpload(file){
     if(this.infoFileLists.length>=2){
       this.$message({
         message:"最多上传两个文件",
         type: 'warning'
       })
       return false
     }
    // 判断文件名是否以-CN.pdf/-EN.pdf结尾
     const typeIsValidate = file.type=="application/pdf"
     if(!typeIsValidate){
       this.$message({
         message:"文件格式应该为pdf",
         type: 'warning'
       })
     }
      const nameIsValidate = typeIsValidate&&/[\w]*(\-CN)|(\-EN)$/.test(file.name.match(/(\S*)\.pdf$/)[1])
      if(!nameIsValidate){
        this.$message({
          message:"文件格式应该为pdf,且文件命名应该以-CN.pdf/-EN.pdf结尾",
          type: 'warning'
        })
      }


     // const nameIsValidate = typeIsValidate&&/\-CN$/.test(file.name.match(/(\w*)\.pdf$/)[1])

     // console.log(typeIsValidate)
     // console.log(file.name)
     return nameIsValidate
   }
  }
}
</script>

<style lang="css" scoped>
.bio-upload{
  margin-top: 30px;
}
</style>
