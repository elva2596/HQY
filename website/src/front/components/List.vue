<template lang="html">
  <ul class="list">
    <li v-for="(list,index) in lists"
        @mouseover="onmouseover(index)"
        @mouseout="onmouseout(index)"
        @click="onclick(list.id)">
      <div class="info">
        <span class="order"
              @click.prevent="linkTo(list.id)"
              >
              {{index+1|formatNumber}}
        </span>
        <span href="#"
              @click.prevent="linkTo(list.id)"
              class="title"
              :style="ispointer"
              >
              {{list.tittle}}
        </span>
        <span class="time">{{list.time}}</span>
      </div>
      <div class="img">
        <img v-if="list.show" :src="list.imgSrc" alt="">
      </div>
    </li>
  </ul>
</template>

<script>
import utils from "@/utils"
export default {
  props:{
    lists:Array,
    ispointer:Object,
    linkTo:{
      type:Function,
      default:()=>{}
    },
    onmouseover:{
      type:Function,
      default:()=>{}
    },
    onmouseout:{
      type:Function,
      default:()=>{}
    },
    onclick:{
      type:Function,
      default:()=>{}
    },
    linkTo:{
      type:Function,
      default:()=>{}
    }
  },
  filters:{
    formatNumber(number){
      if(number<10){
        return "0"+number
      }else{
        return number
      }
    },
    formatTime(time){
      if(this.isEn){
        return moment(time).format("MMMM.DD-YYYY")
      }else{
        return moment(time).format("YYYY-MM-DD")
      }
      // return Date.parse(time)
    }
  },
  mounted(){
    console.log(this.lists)
  },
}
</script>

<style lang="css" scoped>
  .list{
    display: flex;
    flex-wrap: wrap;
    padding-left: 2rem;
  }
  .list li {
    width: 30rem;
    height: 18rem;
    text-align: left;
    position: relative;
  }
  .list li .info{
    display: flex;
    flex-direction: column;
  }
  .list li span,
  .list li a {
    position: absolute;
    color:rgba(166,166,166,1);
  }
  .list li .order{
    top:4rem;
    font-size: 14px;
  }
  .list li .time{
    bottom:.2rem;
    font-size: 14px;
    color:rgba(166,166,166,1);
  }
  .list li .title{
    top:54%;
    font-size: 20px;
  }
  .list li img{
    display: block;
    width: 100%;
    height: 18rem;
    vertical-align: top;
  }
  @media screen and (max-width:480px){
    .list{
      justify-content:center;
      padding:0;
    }
    .list li{
      text-align:center;
      margin-left: 0;
      margin-right: 0;
      border-bottom: 1px solid rgba(166,166,166,0.5);
    }
  }
</style>
