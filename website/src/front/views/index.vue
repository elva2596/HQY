<template lang="html">
  <div class="container" :class="{isloop:isloop}">
    <HeadNav
      class="head"
             :opacityStyle="opacityStyle"
             :navArr="navArr"
             :navArrEn="navArrEn"
             :toggleButtonMsg="toggleButtonMsg"
             :toggleTo_cn="toggleTo_cn"
             :toggleTo_en="toggleTo_en"
             :isEn="isEn"
             :isShow="isShow"
             :isHidden="isHidden">
              <template slot="nav" v-if="noWhite">
                <div class="nav-head">
                  <!--  中英文切换-->
                  <div class="toggle index-toggle">
                    <a class="cn link" @click="toggleTo_cn" :class="{isEn}">胡庆雁</a>
                    <a class="en link" @click="toggleTo_en" :class="{isEn:!isEn}">HUQINGYAN</a>
                  </div>
                  <!-- <header>
                    <router-link to="/">{{author}}</router-link>
                  </header> -->
                  <!--  拇指导航-->

                  <div class="hamburger-button" @click="isHidden">
                    <div class="button hamburger head-hamburger">
                      <span class="icon"></span>
                    </div>
                  </div>
                </div>
              </template>


    </HeadNav>
    <router-view class="main"></router-view>
  </div>
</template>

<script>
import { mapState } from "vuex"
import HeadNav from "@/front/components/head"
export default {
  data(){
    return {
      navArr:[
        {message:"主页",path:""},
        {message:"新闻",path:"news"},
        {message:"作品",path:"works"},
        {message:"简历",path:"about"},
        {message:"出版物",path:"publication"},
        {message:"展览",path:"exhibition"},
        {message:"文本",path:"text"},
        {message:"联系",path:"contact"}
      ],
      navArrEn:[
          {message:"HOME",path:""},
          {message:"NEWS",path:"news"},
          {message:"WORKS",path:"works"},
          {message:"BIOGRAPHY",path:"about"},
          {message:"PUBLICATION",path:"publication"},
          {message:"EXHIBITION",path:"exhibition"},
          {message:"TEXT",path:"text"},
          {message:"CONTACT",path:"contact"}
      ],
      toggleButtonMsg:"中",
      isShow:false
    }
  },
  components:{
    HeadNav
  },
  computed:{
    ...mapState(["isEn","isloop"]),
    noWhite(){
      if(this.$route.path!=="/"||this.isShow){
        return false
      }else{
        return true
      }
    },
    opacityStyle(){
      /**
       * [区分开主页和其他页导航的背景色]
       * @param  {[type]} this [description]
       * @return {[type]}      [description]
       */
      if(this.$route.path==="/"){
        return {
          background:"linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0))"
        }
      }else{
        return {
          backgroundColor: "white"
        }
      }
    }
  },
  methods:{
    toggleTo_cn(){
      this.$store.commit("ISLOCAL",false)
    },
    toggleTo_en(){
      this.$store.commit("ISLOCAL",true)
    },
    isHidden(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="css" scoped>
.container{
  color: #2c3e50;
  height: 100%;
  height: 100%;
  position: relative;
}
.isloop{
  overflow: hidden;
}
.head{
  position: absolute;
}
/*
主页的导航颜色为白色，和其它页的导航颜色不同，并且导航打开的时候导航颜色要与
其他页的颜色一致，因此使用slot(主页的导航css值要改变)分开主页和其他页导航，并且主页的导航className
(并且使用!important)要添加新的，用来覆盖
head组件中的css值
 */
.index-toggle .en,
.index-toggle .cn{
  color:white;
}
/**
 * [控制拇指导航的颜色(通过给)]
 * @type {[type]}
 */
.head-hamburger:before,
.head-hamburger .icon,
.head-hamburger:after{
  background:white!important;
}
.toggle .isEn{
  opacity: 0.5;
}
.hamburger-button{
  width: 2rem;
  height: 2rem;
  /* background: red; */
}
.head .link {
  font-size: 14px;
}
</style>
