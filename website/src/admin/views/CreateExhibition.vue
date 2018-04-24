<template lang="html">
  <ExhibitionForm ref="createExh">
    <el-row class="btns" slot="btns">
      <el-button type="primary" @click="submit" :loading="loading">立即提交</el-button>
    </el-row>
  </ExhibitionForm>
</template>

<script>
import ExhibitionForm from "@/admin/components/ExhibitionForm"
import {createExh} from "@/api"
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      loading:false
    }
  },
  methods:{
    submit(){
      this.$refs["createExh"].$refs["exhForm"].validate((valid)=>{
        if(valid){
          this.loading =true
          createExh(this.exhInfo).then(({data:{status}})=>{
            if(status===1){
              this.$message({
                message:"提交成功",
                type:"success",
                onClose:()=>{
                  this.$store.commit("RESET_EXH",{
                    title_cn:"",
                    title_en:"",
                    place_cn:"",
                    place_en:"",
                    create_time:"",
                    coverUrl:"",
                    desc_cn:"",
                    desc_en:"",
                  })
                  this.loading = false
                  this.$router.push("/admin/exhibitions")
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
  components:{
    ExhibitionForm
  },
  computed:{
    ...mapState(["exhInfo"])
  },
  mounted(){
    
    this.$store.commit("UPDATE_EXH",{
      title_cn:"",
      title_en:"",
      place_cn:"",
      place_en:"",
      create_time:"",
      coverUrl:"",
      desc_cn:"",
      desc_en:"",
    })
  }
}
</script>

<style lang="css" scoped>
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
