<template lang="html">
  <div class="wrap">
    <HeadNav></HeadNav>
    <div class="content">
      这里显示内容
    </div>
    <!-- <div v-html="content" class="content">
    </div> -->
  </div>
</template>

<script>
import {getTexts} from "@/api"
import HeadNav from "@/front/components/head.vue"
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
    getTexts().then(({data:{data}})=>{
      console.log(data)
    })
  }
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
