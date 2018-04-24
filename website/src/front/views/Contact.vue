<template lang="html">
  <div class="wrap">
    <HeadNav></HeadNav>
    <div v-html="content" class="content">
    </div>
  </div>
</template>

<script>
import HeadNav from "@/front/components/head.vue"
import {getContact} from "@/api"
import {mapState} from "vuex"
export default {
  data(){
    return {
      content_cn:"",
      content_en:""
    }
  },
  components:{
    HeadNav
  },
  computed:{
    content(){
      if(this.isEn){
        return this.content_en
      }else{
        return this.content_cn
      }
    },
    ...mapState(["isEn"])
  },
  created(){
    getContact().then(({data:{data}})=>{
        this.content_en = data[0].content_en
        this.content_cn = data[0].content_cn
    })
  },
}
</script>

<style lang="css" scoped>
.wrap{
  height: 100%;
}
  .content{
    padding-top: 4.8rem;
    position: absolute;
    top:calc(50% - 4.8rem);
    left:50%;
    transform: translate(-50%,-50%);
    z-index:-99;
  }

</style>
