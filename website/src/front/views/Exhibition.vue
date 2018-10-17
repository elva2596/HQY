<template lang="html">
  <div class="wrap">
    <ul class="list">
      <li v-for="(list,index) in pubArr" class="list-item">
          <div class="info">
            <span href="#" class="title item">{{list.tittle}}</span>
            <span class="place">{{list.place}}</span>
            <span class="time item">{{list.time}}</span>
            <article class="exh item" ref="" v-html="list.desc">


            </article>
          </div>
          <div class="img" @click="handleClick(index)">

            <img  :src="list.imgSrc" alt="" :class="{ishover:list.ishover}">
          </div>
      </li>
    </ul>

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
              <div @mouseover="imgMouseover(index)" @mouseout="imgmMouseout(index)" class="swiper-item" >
                <img :src="list.imgSrc" alt="" @touchend="handletouch(index)">
                <transition name="slide-fade">
                <VueScrollbar class="img-desc"  ref="Scrollbar" v-if="list.show">
                  <div class="pra" v-html="text"></div>
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
  import {getExhibitions} from "@/api"
  import {mapState} from "vuex"
  import ExhAndPubList from "@/front/components/ExhAndPubList"
  import imgSrc from "../../../static/images/pub.jpg"
  import moment from 'moment'
  import utils from "@/utils"
  const {isMobile}  = utils
  import Toggle from "@/front/components/Toggle"
  import {swiper,swiperSlide} from "vue-awesome-swiper"
  // import a from "ellipsis"
  // console.log(a)
  export default {
    methods:{
      handleClick(index){
        this.imgsArrs = this.initialPubArr[index].exhs.map(item=>({
          ...item,
          show:true,
          imgSrc:isMobile()?item.imageUrl.mexh_c.url:item.imageUrl.pcexh_c.url
        }))
        this.index = index
        this.isloop = true
      },
      toggleTo_cn(){
        this.$store.commit("ISLOCAL",false)
      },
      toggleTo_en(){
        this.$store.commit("ISLOCAL",true)
      },
      onclose(){
        this.isloop = false
      },
      imgMouseover(index){
        if(isMobile()){
          return
        }
        // console.log(this.imgsArr)
        this.imgsArrs[index].show = true
      },
      imgmMouseout(index){
        if(isMobile()){
          return
        }
        this.imgsArrs[index].show = false
      },
      handletouch(index){
        this.imgsArrs[index].show = !this.imgsArrs[index].show
        // this.show = !this.show
      },
    },
    data(){
      return {
        index:0,
        imgsArrs:[],
        swiperOption: {
              // effect: 'fade',
              slidesPerView: 1,
              spaceBetween: 30,
              // loop: true,
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
            },
        isloop:false,
        ispointer:{
          cursor:"pointer"
        },
        initialPubArr:[],
      }
    },
    components:{
      ExhAndPubList,
      Toggle,
      swiper,
      swiperSlide,
      VueScrollbar
    },
    computed:{
      ...mapState(["isEn"]),
      text(){
          const {desc_cn,desc_en} = this.initialPubArr[this.index]
          if(this.isEn){
            return desc_en
          }else{
            return desc_cn
          }
      },
      pubArr(){
        if(this.isEn){
          return this.initialPubArr.map((item)=>({
            id:item._id,
            tittle:item.tittle_en,
            place:item.place_en,
            time:item.create_time_en,
            imgSrc:isMobile()?item.coverUrl.mexh_c.url:item.coverUrl.pcexh_c.url,
            desc:item.desc_en,
            ishover:item.ishover
          }))
        }else{
          return this.initialPubArr.map((item)=>({
            id:item._id,
            tittle:item.tittle_cn,
            place:item.place_cn,
            time:item.create_time_cn,
            imgSrc:isMobile()?item.coverUrl.mexh_c.url:item.coverUrl.pcexh_c.url,
            desc:item.desc_cn,
            ishover:item.ishover
          }))
        }
      }
    },
    async mounted(){
      const {data:{data}} = await getExhibitions()
      console.log(data)
      if(isMobile()){
        this.initialPubArr = data
      }else{
        this.initialPubArr = data.map(item=>({
          ...item,
          ishover:true
        }))
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
.list {
  width: 1210px;
  margin:0 auto;
  padding: 2rem;
  margin-top: 4rem;
}
.info{
  text-align:center;
  width: calc(100% - 75rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.info .item{
  margin:1.4rem 0;
}
.info .item:first-child{
  margin-bottom: 3rem;
}
.list-item{
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
}
.list-item:nth-child(2n) .img{
  order:-1;
}
.img{
  width: 70rem;
}
.img img{
  display: block;
  width: 100%;
}
.info .title{
  font-size: 20px;
  margin-bottom: 2rem;
  text-align: left;
}
.info .place{
  font-size: 18px;
  text-align: left;
}
.time{
  color:#5A5A5A;
  font-size: 16px;
text-align: left;
}
.desc{
  line-height: 3.3rem;
  color:#5A5A5A;
}
img.ishover{
  cursor: pointer;

}
img.ishover:hover{
  opacity: 0.7;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all .5s ease ;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  transform: translateY(16rem);
  opacity: 0;
}

.slide-fade-close-enter-active {
  transition: all .5s ease ;
}
.slide-fade-close-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-close-enter, .slide-fade-close-leave-to
/* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
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
    bottom:0;
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
    /* height:14rem; */
    /* min-height: 14rem; */
    padding: 1rem;
    line-height:1.4em;
  }
  .img-desc .pra p{
    text-align: left;
    color:white !important;
  }

  .toggle{
    position: absolute;
    top:1rem;
    left:2rem;
    cursor: pointer;
    z-index:999;
    color:white;
    font-size: 14px;
  }
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
  .list{
    width: 100%;
  }
  .list-item{
    flex-direction: column;
  }
  .info{
    width: 100%;
    margin-bottom: 2rem;
  }
  .img{
    width: 100%;
  }

  .list-item:nth-child(2n) .img{
    order:0;
  }
  .time{
    font-size: 14px;
  }
  .info .item{
    margin:.4rem 0;
  }
  .swiper-button-prev,
  .swiper-button-next{
    display: none;
  }
  .info .item:first-child{
    margin-bottom: 1.6rem;
  }
  .info .title{
    font-size: 18px;
  }
  .info .place{
    font-size: 16px;
  }
  .time{
    font-size: 14px;
  }
  .swiper-item{
    width: 100%;
    position:static;
  }
  .loop img{
  width: 100%;
  }
  .close::before,
  .close::after{
    width: 1.6rem;
    right: -.6rem;
  }
}
</style>
