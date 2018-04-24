<template lang="html">
  <div class="container">
    <HeadNav class="Homenav"></HeadNav>
    <swiper :options="swiperOption" class="slide-container">
      <!-- <swiper-slide class="item item1"></swiper-slide> -->
      <swiper-slide class="item item2" :class="bg"></swiper-slide>
      <swiper-slide class="item item3" :class="bg"></swiper-slide>
      <swiper-slide class="item item4" :class="bg"></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css"
import HeadNav from "../components/head.vue"
import {swiper,swiperSlide} from "vue-awesome-swiper"
import bg1 from '../../../static/images/bg1.jpg'
import utils from "../../utils"
const {isMobile} = utils
export default {
  data(){
    return {
      isMobile:isMobile(),
      swiperOption: {
         spaceBetween: 30,
         centeredSlides: true,
         effect: 'fade',
         centeredSlides: true,
         swipeHandler:"null",//
         autoplay: {
           delay: 3000,
           disableOnInteraction: true
         }
       }
    }
  },
  components:{
    swiper,
    swiperSlide,
    HeadNav
  },
  computed:{
    /**
     * [根据设备加载不同的背景图的第一种做法:判断navigator,将元素的class设置成计算属性]
     * @return {[type]} [description]
     */
    bg(){
      let value;
      value = this.isMobile?"mobileStyle":"pcStyle"
      return value
    }
  }
}
</script >

<style lang="css" scoped>
  .container{
    // background:red;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  .slide-container{
    // background:blue;
    height:100%;

  }
  .slide-container .item{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    line-height:100%;
    font-size:50px;
    // background:pink;
    background-position:center;
    background-size:cover;
  }
  .Homenav{
    z-index:999;
     background-color:transparent import;
  }
  /**
   * [属于第一种加载背景图的方法]
   * @type {[type]}

  .slide-container .pcStyle.item1{
    background-image:url("../../../static/images/bg1.jpg");
  }
  .slide-container .pcStyle.item2{
    background-image:url("../../../static/images/bg2.jpg");
  }
  .slide-container .pcStyle.item3{
    background-image:url("../../../static/images/bg3.jpg");
  }
  .slide-container .pcStyle.item4{
    background-image:url("../../../static/images/bg4.jpg");
  }
     */



   /**
    * 根据设备加载不同的背景图的第二种做法:使用媒体查询
    */
 .slide-container .item1{
   background-image:url("../../../static/images/bg1.jpg");
 }
 .slide-container .item2{
   background-image:url("../../../static/images/bg2.jpg");
 }
 .slide-container .item3{
   background-image:url("../../../static/images/bg3.jpg");
 }
 .slide-container .item4{
   background-image:url("../../../static/images/bg4.jpg");
 }


@media screen and (max-width:480px){
  .slide-container .item1{
    background-image:url("../../../static/images/bgh1.jpg");
  }
  .slide-container .item2{
    background-image:url("../../../static/images/bgh2.jpg");
  }
  .slide-container .item3{
    background-image:url("../../../static/images/bgh3.jpg");
  }
  .slide-container .item4{
    background-image:url("../../../static/images/bgh4.jpg");
  }
}
</style>
