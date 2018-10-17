<template lang="html">
  <div class="wrap">
      <vue-waterfall-easy
        :imgsArr="workInfo"
        :linkRange="'custom'"
        :maxCols="5"
         @click="onclick"
         :loadingDotCount="0"
        @scrollReachBottom="getData"
        :mobileGap="12"
      >
      <div class="img-info" slot-scope="props">
        <p class="some-info works-tittle img-tittle">{{props.value.tittle}}</p>
      </div>
    </vue-waterfall-easy>

    <transition name="fade">
      <div class="loop-container" v-if="isloop">
        <transition name="slide-fade-close">
          <div class="slide-close">
            <Toggle
              :styleobjcn="{color:'white'}"
              :styleobjen="{color:'white'}"
              :toggleTo_en="toggleTo_en"
              :toggleTo_cn="toggleTo_cn"
              :isEn="isEn"
            ></Toggle>
            <span class="close" @click="onclose"></span>
          </div>
        </transition>
          <swiper :options="swiperOption" class="slide-container loop" >
            <swiper-slide class="item item2" v-for="(list,index) in imgsArrs" :key="list.id">
              <!-- <div  @mouseover="handletouch(index)" @mouseout="handletouch(index)" class="swiper-item" > -->
              <div  class="swiper-item" >
                <img :src="list.src" alt="" @touchend="handletouch(index)" @mouseover="handletouch(index)" @mouseout="handletouch(index)">
                <!-- <img :src="list.src" alt="" @touchend="handletouch(index)"> -->
                <transition name="slide-fade">
                <VueScrollbar class="img-desc"  ref="Scrollbar" v-if="list.show&&list.text">
                  <div class="pra" v-html="list.text"></div>
                </VueScrollbar>
              </transition>
              </div>
            </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev" ></div>
              <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
      </div>
    </transition>
  </div>
</template>

<script>
  import VueScrollbar from 'vue2-scrollbar';
  import Toggle from "@/front/components/Toggle"
  import List from "@/front/components/List.vue"
  import utils from "@/utils"
  import {mapState,mapMutations} from "vuex"
  const {isMobile}  = utils
  import "swiper/dist/css/swiper.css"
  import {swiper,swiperSlide} from "vue-awesome-swiper"
  import vueWaterfallEasy from 'vue-waterfall-easy'
  import {getOneWork} from "@/api"
  export default {
    data(){
      const _this = this
      return {
        page:0,
        workInfo:[],
        show:false,
        imgsArr:[
        ],
        total:2,
        loopEleShow:true,
        index:1,
        swiperOption: {
              slidesPerView: 1,
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              },
              on:{
                slideChange:function (){
                  _this.index = this.activeIndex+1
                }
              }
            },
          ishover:false
        }
    },
    computed:{
      ...mapState(["isEn","isloop"]),
      imgsArrs(){
        if(this.isEn){
          return this.imgsArr.map(item=>({
            id:item._id,
            src:item.imageInfo&&item.imageInfo.url,
            text:item.desc_en,
            show:item.show
          }))
        }else{
          return this.imgsArr.map(item=>({
            id:item._id,
            src:item.imageInfo&&item.imageInfo.url,
            text:item.desc_cn,
            show:item.show
          }))
        }
      }
    },
    methods:{
      getData() {
        const page = this.page
        this.$store.dispatch("getWorks",{isMobile:isMobile(),page}).then(data=>{
          if(data&&data.length===0){return }
          data.forEach((item) => {
            // item.show = isMobile();
            item.show = true;
            item.id = item._id;
            item.src = item.coverInfo&&item.coverInfo.url;
            item.time = this.isEn ? item.create_time_en:item.create_time_cn;
            item.tittle = item.title_en
          })
          this.workInfo = this.workInfo.concat(data);
          this.page++;
        })
      },
      toggleTo_cn(){
        this.$store.commit("ISLOCAL",false)
      },
      toggleTo_en(){
        this.$store.commit("ISLOCAL",true)
      },
      handletouch(index){
        this.imgsArr[index].show = !this.imgsArr[index].show
        this.show = !this.show
      },
      isMobile,
      onclose(){
        this.$store.commit("CHANGE_LOOP")
      },
      onmouseover(index){
        if(isMobile()){
          return
        }
        this.workInfo[index].show = true
      },
      imgMouseover(index){
        if(isMobile()){
          return
        }
        this.imgsArr[index].show = true
      },
      imgmMouseout(index){
        if(isMobile()){
          return
        }
        this.imgsArr[index].show = false
      },
      onmouseout(index){
        if(isMobile()){
          return
        }
        this.workInfo[index].show = false
      },
      onclick(event, { index, value }){
        getOneWork(value.id).then(({data:{data:{works}}})=>{
          this.imgsArr = works.map(item=>({
            ...item,
            show:true,
            imageInfo:isMobile()?item.imageUrl&&item.imageUrl.mlunbo:item.imageUrl&&item.imageUrl.pclunbo
          }))
        })
        this.$store.commit("CHANGE_LOOP")
      }
    },
    components:{
      List,
      swiper,
      swiperSlide,
      VueScrollbar,
      Toggle,
      vueWaterfallEasy
    },
    filters:{
      formatNumber(number){
        if(number<10){
          return "0"+number
        }else{
          return number
        }
      }
    },
    created(){
      this.getData()
    },
    mounted(){
      if(isMobile()){
        this.ishover = true
      }
    }
  }
</script>

<style lang="css" scoped>
  .wrap{
    width: 100%;
    position: absolute;
    top:6rem;
    bottom:0;
  }
    p.some-info{
      font-size: 14px;
      padding:.6rem 0;
      color:#000000;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding-right: 5rem;
      padding-left: 5rem;
    }
  .slide-fade-enter-active {
    transition: all .5s ease ;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateY(16rem);
    opacity: 0;
  }

  .slide-fade-close-enter-active {
    transition: all .5s ease ;
  }
  .slide-fade-close-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-close-enter, .slide-fade-close-leave-to{
    transform: translateY(-16rem);
    opacity: 0;
  }
  .loop .item{
    display:flex;
    justify-content:center;
    align-items:center;
    height:100%;
    background-position:center;

  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
    opacity: 0;
  }
    .loop-container{
      position: fixed;
      background:black;
      height:100%;
      width: 100%;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:99;

    }
    .loop{
      height: 100%;
      width: 100%;
    }
    .loop img{
      display: block;
      max-height: 100%;
      cursor: pointer;
      margin-top: 50vh;
      transform: translateY(-50%);

    }
    .loop-container .img-desc{
      position:absolute;
      bottom:-3%;
      left:0;
      right:0;
      max-height: 14rem;
      background: black;
      background:rgba(0,0,0,0.5);
      z-index:999;
      color:white;
      font-size: 16px;
      text-align: left;
      overflow: hidden;
    }
    .pra{
      padding: 1rem;
      line-height:1.4em;
      padding-bottom: 3rem;
    }
    .img-desc .pra p{
      text-align: left;
      color:white !important;
    }


    /**
     * [轮播图中的切换按钮]
     * @type {[type]}
     */
    .toggle{
      position: absolute;
      top:1rem;
      left:2rem;
      cursor: pointer;
      z-index:999;
      color:white;
      font-size: 14px;
    }

    /**
     * [右上角关闭按钮]
     * @type {[type]}
     */
    .close{
      position: absolute;
      right:2rem;
      top:1rem;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
      z-index:999;
    }
    .close::before,
    .close::after{
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background: blue;
      position: absolute;
      top:calc(50% - 1px);
      transform: rotate(45deg);
      background: white;
      cursor: pointer;
    }
    .close::after{
      transform: rotate(-45deg);
    }

    /**
     * [轮播条目]
     * @type {[type]}
     */
    .swiper-button-prev,
    .swiper-button-next{
      outline: none;
      width: 2rem;
      height:4px;
      background:none;
      transform: translateX(-6rem);
    }
    .swiper-button-prev{
      transform: translateX(6rem);
    }
    .swiper-button-prev::before,
    .swiper-button-next::before{
      content: "";
      display: block;
      width: 1.4rem;
      height:.2rem;
      background: white;
      transform: rotate(-30deg);
      position:relative;
      top:.4rem;
    }
    .swiper-button-prev::before{
      transform: rotate(-150deg)
    }
    .swiper-button-prev::after,
    .swiper-button-next::after{
      content: "";
      display: block;
      width: 1.4rem;
      height:.2rem;
      background: white;
      transform: rotate(30deg);
      position:relative;
      top:-.4rem;
    }
    .swiper-button-prev::after{
      transform: rotate(150deg)
    }
    .swiper-item{
      height:94%;
      position:relative;
    }


    @media screen and (max-width:480px){
      .loop-container .img-desc{

      max-height: 18rem;

    }
      p.some-info{
        padding-right: 3rem;
        padding-left: 3rem;
      }
      .swiper-item{
        width: 100%;
        position:static;
      }
      .loop img{
        width: 100%;
      }
      .swiper-button-prev,
      .swiper-button-next{
        display: none;
      }
      .close::before,
      .close::after{
        width: 1.6rem;
        right: -.6rem;
      }
    }
</style>
