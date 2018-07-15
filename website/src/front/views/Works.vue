<template lang="html">
  <div class="wrap">
    <ul class="list">
      <li v-for="(list,index) in worksArr"
            @click="onclick(list.id)"
        >
          <!-- <div class="info" v-if="!ishover&&!list.show">
            <span class="order"

                  >
                  {{index+1|formatNumber}}
            </span >
            <span href="#"class="title">
                  {{list.tittle}}
            </span>
            <span class="time" v-if="list.time">{{list.time}}</span>
          </div> -->
        <!-- <transition name="fade"> -->
          <div class="img">
            <img  v-lazy="list.imgSrc" alt=""
            >
            <span class="title img-tittle" >{{list.tittle}}</span>
          </div>
        <!-- </transition> -->
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
              <div  @mouseover="imgMouseover(index)" @mouseout="imgmMouseout(index)" class="swiper-item" >
                <img :src="list.imgSrc" alt="" @touchend="handletouch(index)">
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
import imgSrc1 from "../../../static/images/bgh2.jpg"
import imgSrc from "../../../static/images/bg1.jpg"
import utils from "@/utils"
import {mapState,mapMutations} from "vuex"
const {isMobile}  = utils
import "swiper/dist/css/swiper.css"
import {swiper,swiperSlide} from "vue-awesome-swiper"
import {getOneWork} from "@/api"
export default {
  data(){
    const _this = this
    return {
      workInfo:[],
      show:false,
      imgsArr:[
      ],
      total:2,
      loopEleShow:true,
      index:1,
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
            },
            on:{
              slideChange:function (){
                _this.index = this.activeIndex+1
                console.log(this.activeIndex)
              }
            }
          },
        ishover:false
      }
  },
  computed:{
    ...mapState(["isEn","isloop"]),
    worksArr(){
      // const
      if(this.isEn){
        return this.workInfo.map(item=>({
          id:item._id,
          imgSrc:item.coverUrl,
          time:item.create_time_en,
          tittle:item.title_en,
          show:item.show
        }))
      }else{
        return this.workInfo.map(item=>({
          id:item._id,
          imgSrc:item.coverUrl,
          time:item.create_time_cn,
          tittle:item.title_cn,
          show:item.show
        }))
      }
    },
    imgsArrs(){
      if(this.isEn){
        return this.imgsArr.map(item=>({
          id:item._id,
          imgSrc:item.imageUrl,
          text:item.desc_en,
          show:item.show
        }))
      }else{
        return this.imgsArr.map(item=>({
          id:item._id,
          imgSrc:item.imageUrl,
          text:item.desc_cn,
          show:item.show
        }))
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
    onclick(id){
      getOneWork(id).then(({data:{data:{works}}})=>{
        console.log(works)
        this.imgsArr = works.map(item=>({
          ...item,
          show:true
        }))
        // console.log(works)
      })
      this.$store.commit("CHANGE_LOOP")
    }
  },
  components:{
    List,
    swiper,
    swiperSlide,
    VueScrollbar,
    Toggle
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
    if(isMobile()){
      this.worksArr.forEach(item=>{
        item.show = true
      })
    }
    this.$store.dispatch("getWorks").then(re=>{
      this.workInfo = re.reverse().map(item=>({
        ...item,
        show:false
      }))
    })
  },
  mounted(){
    if(isMobile()){
      this.ishover = true
    }
  }
}
</script>

<style lang="css" scoped>
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
.wrap{
  position: relative;
}
.main{
  position: absolute;
  top:6rem;
  width: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
  opacity: 0;
}
  .list{
    display: flex;
    flex-wrap: wrap;
    padding-left: 3rem;
    padding-right: 3rem;
    font-family:"PingFangSC";
    padding-bottom: 4rem;
    margin-top: 4rem;
  }
  .list li {
    width:25%;
    height: 16rem;
    text-align: left;
    position: relative;
    flex:0 1 25%;
    margin:3rem 0;
  }
  .list li .info{
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* pad */
  }
  .list li span,
  .list li a {
    display:block;
    color:rgba(166,166,166,1);
  }
  .list li .order{
    display:block;
    font-size: 14px;
    color:#000000;
  }
  .list li .time{
    bottom:.2rem;
    font-size: 14px;
    color:rgba(166,166,166,1);

  }
  .list li .authorInfo{
    bottom:.2rem;
    font-size: 14px;
    color:rgba(166,166,166,1);

  }
  .list li .title{
    display:block;
    width: 100%;
    font-size: 18px;
    color:#000000;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    padding-right: 5rem;
  }
  .list li .img{
    height: 100%;
    /* cursor: pointer; */
  }
  .list li img{
    height:100%;
    cursor: pointer;
  }
  .list li .ishover{
    cursor: pointer;
  }
  .list li .ishover .order,
  .list li .ishover .title,
  .list li .ishover .time{
    color:white;
  }
  .img-tittle{
    margin-top: 1rem;
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
    height:14rem;
    /* min-height: 14rem; */
    padding: 1rem;
  }
  .img-desc .pra p{
    text-align: left;
    color:white !important;
  }
  .index{
    position: absolute;
    left:0;
    top:1.6rem;
    font-size: 18px;
    text-align: center;
    color:white;
    width:100%;
  }
  .toggle{
    position: absolute;
    top:1rem;
    left:2rem;
    cursor: pointer;
    z-index:999;
    color:white;
    font-size: 16px;
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
    overflow: hidden;
  }
  @media screen and (max-width:480px){
    .list{
      padding-left:0rem;
      padding: 0;
      /* padding:0 2rem; */
    }
    .list li{
      /* width: 50%; */
      text-align:center;
      margin-left: 0;
      margin-right: 0;
      margin:3.6rem 0;
      height: 16vh;
      flex:0 0 50%;
    }

    .list li .info{
      text-align: left;
    }
    .list li .img-tittle{
      font-size: 14px;
      margin-top: 0;
      padding:0 2rem;
    }
    .swiper-item{
      width: 100%;
      position:static;
    }
    .loop img{
      max-width: 100%;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
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
    .list li img{
      max-width: 100%;
    }
  }
</style>
