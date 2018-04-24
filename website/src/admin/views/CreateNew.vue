<template lang="html">
    <CreateNew ref="createNew">
      <el-row class="btns" slot="btns">
        <el-button type="primary" @click="submit" :loading="loading">立即提交</el-button>
      </el-row>
    </CreateNew>
</template>

<script>
import CreateNew from "@/admin/components/newsForm"
import {createNew} from "@/api"
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      loading:false
    }
  },
  components:{
    CreateNew
  },
  methods:{
    submit(){
      this.$refs["createNew"].$refs["newForm"].validate((valid)=>{
        if(valid){
          this.loading =true
          createNew(this.newsInfo).then(({data:{status}})=>{
            if(status===1){
              this.$message({
                message:"提交成功",
                type:"success",
                onClose:()=>{
                  this.$store.commit("RESET_NEWFORM",{
                    title_cn:"",
                    title_en:"",
                    place_cn:"",
                    place_en:"",
                    coverUrl:"",
                    content_cn:"",
                    content_en:"",
                  })
                  this.loading = false
                  this.$router.push("/admin/news")
                }
              })
            }
          })
        }else{
          this.$message({
            message:"请填写完所有表单之后再提交",
            type:"error"
          })
        }
      })
    }
  },
  computed:{
    ...mapState(["newsInfo"])
  },
  mounted(){
    this.$store.commit("UPDATE_NEW",{
      title_cn:"",
      title_en:"",
      place_cn:"",
      place_en:"",
      coverUrl:"",
      content_cn:"",
      content_en:""
    })
  }
}
</script>

<style lang="css">
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  border-top:2px solid  #d9d9d9 ;
  text-align: center;
}
.text-center{
  text-align: center;
}
</style>
