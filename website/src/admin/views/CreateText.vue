<template lang="html">
    <Text-form>
      <el-row class="btns" slot="btns">
        <el-button type="primary" @click="submit" :loading="loading">立即提交</el-button>
      </el-row>
    </Text-form>
</template>

<script>
import TextForm from "@/admin/components/TextForm"
import {createText} from "@/api"
import {mapState,mapMutations} from 'vuex'
import moment from "moment"
export default {
  data(){
    return {
      loading:false
    }
  },
  components:{
    "Text-form":TextForm
  },
  methods:{
    reset(){
      this.$store.commit("RESET_TEXT",{
        content_cn:"",
        content_en:"",
        tittle_en:"",
        tittle_cn:"",
        time_cn:""
      })
    },
    submit(){
          this.loading =true
          // console.log(moment(this.textInfo.time_cn).format('YYYY-MM-DD'))
          // console.log()
          createText(this.textInfo).then(({data:{status}})=>{
            if(status===1){
              this.$message({
                message:"提交成功",
                type:"success",
                onClose:()=>{

                  this.loading = false
                  this.$router.push("/admin/texts")
                }
              })
            }
          })
    }
  },
  computed:{
    ...mapState(["textInfo","actionUrl"])
  },
  mounted(){
    this.reset()
  }
}
</script>

<style lang="css" scoped>
.btns{
  padding-bottom: 20px;
  padding-top: 20px;
  text-align: center;
}
.text-center{
  text-align: center;
}
</style>
