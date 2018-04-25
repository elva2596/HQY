<template lang="html">
  <div class="container">
    <div class="filter">
    </div>
    <div class="nav">

      <!--  中英文切换-->
      <div class="toggle" @click="toggle">
        {{toggleButton}}
      </div>
      <!-- <header>
        <router-link to="/">{{author}}</router-link>
      </header> -->
      <!--  拇指导航-->
      <div class="button hamburger" :class="{active:isShow}" @click="isHidden">
        <span class="icon"></span>
      </div>

      <!-- 满屏导航 -->
      <transition name="list">
        <ul class="navBar" v-show="isShow">
          <template v-if="isEn">
              <li v-for="(item,index) in navArrEn" :key="index">
                <router-link :to="'/'+item.path">{{item.message}}</router-link>
              </li>
          </template>
          <template id="" v-else>
              <li v-for="(item,index) in navArr" :key="index">
                  <router-link :to="'/'+item.path">{{item.message}}</router-link>
              </li>
          </template>
        </ul>
      </transition>
    </div>

  </div>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    data(){
      return {
        toggleButton:"中",
        isShow:false,
        navArr:[
          {message:"新闻",path:"news"},
          {message:"作品",path:"works"},
          {message:"简历",path:"about"},
          {message:"出版物",path:"publication"},
          {message:"展览",path:"exhibition"},
          {message:"文本",path:"text"},
          {message:"联系",path:"contact"}
        ],
        navArrEn:[
          {message:"NEWS",path:"news"},
          {message:"WORKS",path:"works"},
          {message:"BIOGRAPHY",path:"about"},
          {message:"PUBLICATION",path:"publication"},
          {message:"EXHIBITION",path:"exhibition"},
          {message:"TEXT",path:"text"},
          {message:"CONTACT",path:"contact"}
        ]
      }
    },
    methods:{
      toggle(){

        this.$store.commit("ISLOCAL")
        if(!this.isEn){
          this.toggleButton="中"
        }else{
          this.toggleButton="EN"
        }
      },
      isHidden(){
        this.isShow = !this.isShow
        this.$store.commit("HIDDEN",this.isShow)
      }
    },
    computed:{
      author(){
        if(!this.isEn){
          return "胡庆雁"
        }else{
          return "Hu Qingyan"
        }
      },
      ...mapState(["isEn"])
    },
    mounted(){
      console.log(window)
    }
  }
</script>

<style lang="css" scoped>

  /*汉堡包导航*/
  .hamburger:before,
  .hamburger:after {
    content: "";
  }
  .hamburger:before,
  .hamburger .icon,
  .hamburger:after {
    /* color:; */
    display: block;
    width: 100%;
    height: .3rem;
    margin: 0 0 .3rem;
    /*三个值top auto bottom*/
    transition: all .2s ease-in-out;
    border-radius: .5rem;
    background:#818181;
  }
  .hamburger.active .icon {
    transform:scale(0);
  }
  .hamburger.active:before {
    transform: translateY(.6rem) rotate(45deg);
  }
  .hamburger.active:after {
    transform: translateY(-0.6rem) rotate(-45deg);
  }
  .nav{
    height: 4.8rem;
    position: fixed;
    top:0;
    width: 100%;
    display: flex;
    font-size: 18px;
    transition: .3s;
    justify-content:space-between;
    padding:1rem  2rem ;
    color:#818181;
    /* background: rgba(0,0,0,0.1); */
    /* -webkit-filter: blur(1px) */
  }
  header a {
    color:#818181;
  }
  .button,
  .toggle{
    width: 1.8rem;
    cursor:pointer;
    z-index: 9999;

    /*同级元素同时设置position不等于static时候，后面覆盖前面，当设置后面的z-index值大于前面的时候，前面元素中的子元素的z-index
    设置的在大也没用
    */
  }
  .button{
    width: 2rem;
    padding-top: 0.4rem;
  }
  .navBar{
    background: rgba(255,255,255,0.9);
    position:fixed;
    /*fixed相对于元素视口*/
    top:0;
    bottom:0;
    left:0;
    right:0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index:999;
  }
  /**/
  .list-enter-active, .list-leave-active {
    transition: all .5s;
  }
  .list-enter, .list-leave-to{
    opacity: 0;
    transform: translateX(50%);
  }
  .container{
    width: 100%;
  }
  .filter{
    position: absolute;
    top:0;
    left:0;
    right:0;
    width: 100%;
    /* background: red; */
    height: 4.8rem;
        /* background: rgba(0,0,0,0.1);
    -webkit-filter: blur(1px) */
    /* z-index:999; */
  }
</style>
