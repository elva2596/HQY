<template lang="html">
  <div class="wrap">
    <HeadNav class="head"></HeadNav>
    <div class="main">
      <List :lists="textsArr"
            :onmouseover="onmouseover"
            :onmouseout="onmouseout"
            :linkTo = "linkTo"
            :ispointer="ispointer"

      ></List>
    </div>
  </div>
</template>

<script>
import moment from "moment"
import {getTexts} from "@/api"
import HeadNav from "@/front/components/head.vue"
import List from "@/front/components/List.vue"
import {mapState} from "vuex"
import imgSrc from "../../../static/images/bg1.jpg"
import utils from "@/utils"
export default {
  data(){
    return {
      ispointer:{
        cursor:"pointer"
      },
      /**
       * [此处的arr应该是从后台获取的数据，并且应该是计算属性，因为要在原数据中添加一个show标志位]
       * @type {Array}
       */
      // arr:[{id:0,title:"A",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:1,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:2,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:3,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:4,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:5,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:5,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:5,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //     {id:5,title:"This is a mock data",imgSrc,time:"2018-4-25",text:"heheeh",show:false},
      //   ],
      initialTextsArr:[],
      textsArr_cn:"",
      textsArr_en:""
    }
  },
  components:{
    HeadNav
  },
  computed:{
    ...mapState(["isEn"]),
    textsArr:{
      get(){
        if(this.isEn){
          return this.initialTextsArr.map((item)=>({
            id:item._id,
            time:moment(item.time_cn).format("MMMM.DD-YYYY"),
            tittle:item.tittle_en,
            show:item.show,
            imgSrc:item.imgSrc
          }))
          // return this.content_en
        }else{
          return this.initialTextsArr.map((item)=>({
            id:item._id,
            time:moment(item.time_cn).format("YYYY-MM-DD"),
            tittle:item.tittle_cn,
            show:item.show,
            imgSrc:item.imgSrc
          }))
        }
      },
      set(val){
        console.log(val)
      }
    }
  },
  components:{
    List,
    HeadNav
  },
  methods:{
    toLocal(){

    },
    onclick(val){
      /**
       * [show description]
       * @type {[type]}
       * TODO:
       *   这里进行路由跳转(用在新闻页)
       */
      console.log(val)
    },
    onmouseover(index){
      const {isMobile}  = utils
      if(isMobile()){
        return
      }
      console.log()
      this.initialTextsArr[index].show = true
      console.log(this.initialTextsArr[index].show)
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
       * TODO:
       *   这里跳出全屏相册集组件
       */
      console.log(id)
    }
  },
  async created(){
    /**
     * [调用文本列表接口]
     * @type {String}
     */
    let {data:{data}} =await getTexts()
     this.initialTextsArr = data.map((item)=>({
       ...item,
       imgSrc,
       show:false
     }))
  }
}
</script>

<style lang="css" scoped>
.wrap{
  height: 100%;
  position: relative;
}
  .head{
    position: absolute;
    z-index:99;
  }
  .main{
    position: absolute;
    top:10rem;
    width: 100%;
  }
</style>
