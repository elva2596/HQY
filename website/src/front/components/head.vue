<template lang="html">
  <div class="container">
    <div class="nav">
      <slot name="nav">
        <div class="nav-head" :style="opacityStyle">
          <!--  中英文切换-->
          <Toggle
            :toggleTo_cn="toggleTo_cn"
            :toggleTo_en="toggleTo_en"
            :isEn = "isEn"
          ></Toggle>
          <!-- <header>
            <router-link to="/">{{author}}</router-link>
          </header> -->
          <!--  拇指导航-->
          <div class="hamburger-button" @click="isHidden">
            <div class="button hamburger" :class="{active:isShow}" >
              <span class="icon"></span>
            </div>
          </div>

        </div>
      </slot>
      <slot name="navList">
          <!-- 满屏导航 -->
          <transition name="list">
            <ul class="navBar" v-show="isShow" @click="isHidden">
              <template v-if="isEn">
                  <li v-for="(item,index) in navArrEn" :key="index">
                    <router-link :to="'/'+item.path">{{item.message}}</router-link>
                  </li>
              </template>
              <template v-else>
                  <li v-for="(item,index) in navArr" :key="index">
                      <router-link :to="'/'+item.path">{{item.message}}</router-link>
                  </li>
              </template>
            </ul>
          </transition>
      </slot>
    </div>
  </div>
</template>

<script>

import Toggle from "./Toggle"
/**
 * [展示型组件]
 * @type {Object}
 */
  export default {
    components:{
      Toggle
    },
    props:{
      opacityStyle:{
        type:Object,
        default(){
          return {
            backgroundColor: "white"
          }
        }
      },
      toggleButtonMsg:{
        type:String,
        default:""
      },
      isEn:{
        type:Boolean,
        default:false
      },
      navArr:{
        type:Array,
        required:true,
        default(){
          return [
            {message:"",path:""},
          ]
        }
      },
      navArrEn:{
        type:Array,
        required:true,
        default(){
          return [
            {message:"",path:""},
          ]
        }
      },
      toggleTo_cn:{
        type:Function,
        default:()=>{}
      },
      toggleTo_en:{
        type:Function,
        default:()=>{}
      },
      isHidden:{
        type:Function,
        default:()=>{}
      },
      isShow:{
        type:Boolean,
        default:false
      }
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
    display: block;
    width: 100%;
    height: .3rem;
    /* margin: 0 0 .3rem; */
    /*三个值top auto bottom*/
    transition: all .2s ease-in-out;
    border-radius: .5rem;
    background:rgb(90, 90, 90);
  }
  .hamburger .icon{
    margin:.3rem 0;
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

    color:rgb(90, 90, 90);
    z-index:99;
  }
  .nav-head{
    display: flex;
    width: 100%;
    justify-content:space-between;
    padding:2rem  3rem ;
  }

  .hamburger-button,
  .button,
  .toggle{
    /* width: 1.8rem; */
    cursor:pointer;
    z-index: 999;

    /*同级元素同时设置position不等于static时候，后面覆盖前面，当设置后面的z-index值大于前面的时候，前面元素中的子元素的z-index
    设置的在大也没用
    */
  }
  .toggle .cn{
    display: inline-block;
    /* margin-right: 1rem; */
  }

  .button{
    width: 2rem;
    /* padding-top: 0.4rem; */
  }
  .hamburger-button{
    width: 2rem;
    /* height: 2rem; */
    /* background: red; */
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
    font-size: 16px;
  }
  .navBar a{
    font-family:"Source Sans Pro",sans-serif;
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

  @media screen and (max-width:480px){
    .navBar{
      font-size: 14px;
    }
    .nav-head{
      display: flex;
      width: 100%;
      justify-content:space-between;
      padding:2rem ;
    }
    .button{
      width: 1.8rem;
      padding-top: 0.2rem;
    }
    .navBar{
      font-size: 14px;
    }
  }
</style>
