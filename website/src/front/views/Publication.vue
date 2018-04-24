<template lang="html">
  <div class="wrap">
    <HeadNav></HeadNav>
    <div  class="content">
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      出版物
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
      <p>出版物</p>
    </div>
  </div>
</template>

<script>
import {getBio} from "@/api"
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
    getBio().then(({data:{data}})=>{
      this.content_en = data[0].content_en
      this.content_cn = data[0].content_cn
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
