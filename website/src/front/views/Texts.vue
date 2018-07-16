<template lang="html">
  <div class="wrap">
      <List :lists="textsArr"
            :linkTo = "linkTo"
            :ispointer="ispointer"
            class="main"
      ></List>
  </div>
</template>

<script>
import {getTexts} from "@/api"
import List from "@/front/components/List.vue"
import {mapState} from "vuex"
import imgSrc from "../../../static/images/bg1.jpg"
import utils from "@/utils"
const {filterUrl} = utils
export default {
  data(){
    return {
      ispointer:{
        cursor:"pointer"
      },
      initialTextsArr:[],
    }
  },
  computed:{
    ...mapState(["isEn"]),
    textsArr:{
      get(){
        if(this.isEn){
          return this.initialTextsArr.map((item)=>({
            id:item._id,
            tittle:item.tittle_en,
            authorInfo:item.authorInfo_en,
            show:item.show,
            imgSrc:item.imgSrc,
            fileUrl:filterUrl(item.fileList,this.isEn)
          }))
        }else{
          return this.initialTextsArr.map((item)=>({
            id:item._id,
            tittle:item.tittle_cn,
            authorInfo:item.authorInfo_cn,
            show:item.show,
            imgSrc:item.imgSrc,
            fileUrl:filterUrl(item.fileList,this.isEn)
          }))
        }
      }
    }
  },
  components:{
    List
  },
  methods:{
    onclick(val){
      /**
       * [show description]
       * @type {[type]}
       * TODO:
       * 这里跳出全屏相册集组件(用在作品页)
       *
       */

      // console.log(val)
    },
    onmouseover(index){
      const {isMobile}  = utils
      if(isMobile()){
        return
      }
      this.initialTextsArr[index].show = true
    },
    onmouseout(index){
      const {isMobile}  = utils
      if(isMobile()){
        return
      }
      this.initialTextsArr[index].show = false
    },
    linkTo(id){
      /**
       * [lang description]
       * @type {String}
       * TODO:这里进行路由跳转(用在文本页)
       *
       */
        this.$router.push({path:`/text/${id}`})
    }
  },
  async created(){
    /**
     * [调用文本列表接口]
     * @type {String}
     *
     * 对获取来的原始数据在这里进行处理的必要性:
     *  上面要用到计算属性，因此在这里修改一下用来初始化原始初始数据的属性。
     */
   let {data:{data}} =await getTexts()
   console.log(data)
   this.initialTextsArr = data.map((item)=>({
     ...item,
     imgSrc,
     show:false,
     // ishover:false
   }))
   console.log(this.textsArr)
  }
}
</script>

<style lang="css" scoped>
  .wrap{
    /* height: 100%; */
    position: relative;
  }
  .main{
    position: absolute;
    top:5rem;
    width: 100%;
      /* padding: 2rem; */
  }
</style>
