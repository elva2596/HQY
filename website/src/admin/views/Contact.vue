<template lang="html">
  <div class="container">
    <div class="bio">
      <h4>联系中文</h4>
      <quill-editor
          class="editer bio_cn"
          ref="editor_cn"
          v-model="contactInfo.content_cn">
      </quill-editor>
    </div>
    <div class="bio">
      <h4 class="tittle_en">联系英文</h4>
      <quill-editor
          class="editer"
          ref="editor_cn"
          v-model="contactInfo.content_en">
      </quill-editor>
    </div>
    <div class="btn">
      <el-button type="primary" @click="submit" :loading="loading">立即提交</el-button>
    </div>
  </div>
</template>

<script>
import {getContact,updateContact,createContact} from "@/api"
export default {
  data(){
    return {
      loading:false,
      isNull:true,
      contactInfo:{
        content_cn:"",
        content_en:""
      }
    }
  },
  methods:{
    submit(){
      this.loading =true
      if(this.isNull){
        createContact(this.contactInfo).then(({data:{status}})=>{
          if(status===1){
            this.$message({
              message:"提交成功",
              type:"success",
              onClose:()=>{
                this.loading = false
              }
            })
          }
        })
      }else{
          updateContact(this.contactInfo).then(({data:{status}})=>{
            if(status===1){
              this.$message({
                message:"提交成功",
                type:"success",
                onClose:()=>{
                  this.loading = false
                }
              })
            }
          })
      }

    }
  },
  created(){
    getContact().then(({data})=>{
      if(data.data.length>0){
        console.log(data)
        this.contactInfo = data.data[0];
        this.isNull = false
      }
    })
  }
}
</script>

<style lang="css" scoped>
.container{
  width: 600px;
  margin:30px auto;
  box-shadow: 1px 1px 10px  #333333;
  border-radius: 6px;
  padding-top: 10px;

}
.editer{
  height: 500px;

}
.bio_cn{
  border-bottom: 1px solid silver;
}
.bio{
  margin-bottom: 46px;
}
.btn{
  margin-top: 100px;
  margin-bottom: 10px;
}
</style>
