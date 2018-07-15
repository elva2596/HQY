<template lang="html">
  <div class="wrap">
    <!-- <HeadNav></HeadNav> -->
    <a :href="bioUrl" target="_blank" class="bio-download el-icon-document"></a>
    <div v-html="content" class="about-content">
    </div>
  </div>
</template>

<script>
/**
 * [简历页]
 * @type {String}
 */
import {getBio} from "@/api"
import HeadNav from "@/front/components/head.vue"
import {mapState} from "vuex"
import utils from "@/utils"
const {filterUrl} = utils;
export default {
  data(){
    return {
      content_cn:"",
      content_en:"",
      fileList:[]
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
    bioUrl(){
      return filterUrl(this.fileList,this.isEn)
    },
    ...mapState(["isEn"])
  },
  async created(){
    let {data:{data}} = await getBio()
    console.log(data)
    this.content_en = data[0].content_en
    this.content_cn = data[0].content_cn
    this.fileList = data[0].fileList

  }
}
</script>

<style lang="css" scoped>
.wrap{
  height: 100%;
}
  .bio-download{
    position: absolute;
    top:14.4rem;
    text-align: left;
    left:12rem;
    font-size: 14px;
    z-index:90;
  }
  .bio-download:hover{
    opacity: .5;
  }
  .about-content{
    /* padding-top: 4.8rem; */
    padding-bottom: 8rem;
    position: absolute;
    top:14rem;
    text-align: left;
    left:3rem;
    font-size: 14px;
    /* left:50%;
    transform: translate(-50%,-50%); */
    z-index:9;
  }
  @media screen and (max-width:480px){
    .about-content{
      left:2rem;
      top:10rem;
    }
    .bio-download:hover{
      opacity:1;
    }
    .bio-download{
      top:10.4rem;

      left:10rem;

    }
  }
</style>
