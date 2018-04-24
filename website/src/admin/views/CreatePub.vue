<template lang="html">
    <publicationForm ref="createPub">
      <el-row class="btns" slot="btns">
        <el-button type="primary" @click="submit" :loading="loading">立即提交</el-button>
      </el-row>
    </publicationForm>
</template>

<script>
import publicationForm from "@/admin/components/PublicationForm"
import {createPub} from "@/api"
import {mapState,mapMutations} from 'vuex'
export default {
  data(){
    return {
      loading:false
    }
  },
  components:{
    "publicationForm":publicationForm
  },
  methods:{
    reset(){
      this.$store.commit("RESET_PUB",{
        content_cn:"",
        content_en:"",
        coverUrl:"",
        tittle_en:"",
        tittle_cn:""
      })
    },
    submit(){
          this.loading =true
          createPub(this.pubInfo).then(({data:{status}})=>{
            if(status===1){
              this.$message({
                message:"提交成功",
                type:"success",
                onClose:()=>{
                  this.reset()
                  this.loading = false
                  this.$router.push("/admin/publications")
                }
              })
            }
          })
    }
  },
  computed:{
    ...mapState(["pubInfo"])
  },
  mounted(){
    this.reset()
  }
}
</script>

<style lang="css">
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  text-align: center;
}
.text-center{
  text-align: center;
}
</style>
