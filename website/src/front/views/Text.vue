<template lang="html">
  <div class="wrap">
    <div class="content">
      <h3 class="tittle">{{textInfo.tittle}}</h3>
      <span>{{textInfo.authorInfo}}</span>
      <article class="article" v-html="textInfo.content">

      </article>
    </div>

  </div>
</template>

<script>
import {getText} from "@/api"
import {mapState} from "vuex"
import moment from "moment"
export default {
  data(){
    return {
      initialtextInfo:''
    }
  },
  computed:{
    ...mapState(["isEn"]),
    textInfo(){
      const {tittle_cn,tittle_en,authorInfo_cn,authorInfo_en,content_en,content_cn} = this.initialtextInfo
      let info = this.isEn?{
        tittle:tittle_en,
        authorInfo:authorInfo_en,
        content:content_en
      }:{
        tittle:tittle_cn,
        content:content_cn,
        authorInfo:authorInfo_cn,
      }
      return info;
    }
  },
  async created(){
    let {data:{status,data}} =   await getText(this.$route.params.id)
    if(status===1){
      /**
       * [lang description]
       * @type {String}
       * TODO:
       *    做一些数据的处理
       */
      this.initialtextInfo = data
      console.log(data)
    }
  }
}
</script>

<style lang="css" scoped>
.wrap{
  height: 100%;
  position: relative;

}
.content{
  position: absolute;
  top:10rem;
  width: 100%;
  font-size: 20px;
  text-align: left;
  padding: 3rem;
  font-family: "PingFangSC";
}
.content h3{
  font-size: 20px;
  margin-bottom: 3rem;
}
.content span{
  font-size: 14px;
}
.content .article{
  margin:3rem 0;
  color:#5A5A5A !important;
  text-indent: 2em;
  line-height:3rem;
}
@media screen and (max-width:480px){
  .content .tittle{
    font-size: 16px !important;
  }
  .content{
    padding: 2rem;
  }
}
</style>
