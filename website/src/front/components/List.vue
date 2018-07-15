
<template lang="html">
  <ul class="list">
    <li v-for="(list,index) in lists"
        @mouseover="onmouseover(index)"
        @mouseout="onmouseout(index)"
        @click="onclick(list.id)">
      <div class="info">
        <span class="order"
              @click="linkTo(list.id)"
              :style="ispointer"
              >
              {{index+1|formatNumber}}
        </span>
        <span href="#"
              @click.prevent="linkTo(list.id)"
              class="tittle"
              :style="ispointer"
              >
              {{list.tittle}}
        </span>
        <span class="time" v-if="list.time">{{list.time}}</span>
        <span class="authorInfo" v-if="list.authorInfo">{{list.authorInfo}} <a target="_blank" v-if="list.fileUrl" :href="list.fileUrl" class="text-link el-icon-document"></a> </span>
      </div>
    </li>
  </ul>
</template>

<script>
/**
 * [文本列表组件]
 * @type {Object}
 */
import utils from "@/utils"
export default {
  computed:{
    ishover(show){
      return show
    }
  },
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
      console.log
      if(number<10){
        return "0"+number
      }else{
        return number
      }
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
    padding-left: 3rem;
    padding-right: 3rem;
    font-family:"PingFangSC";
    padding-bottom: 4rem;
    margin-top: 4rem;
    justify-content: space-between;
  }
  .list li {
    height: 18rem;
    text-align: left;
    position: relative;
    flex:0 1 25%;
    padding-right: 1rem;
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
    color:rgba(166,166,166,1);
  }
  .list li .order{
    top:4rem;
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
  .list li .tittle{
    top:54%;
    font-size: 18px;
    color:#000000;
    padding-right: 3rem;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .text-link{
    margin-left: .6rem;
    /* display: inline-block; */
    /* background: red;
    width: 20px;
    height: 20px; */
  }
  .order:hover,
  .tittle:hover{
    opacity: 0.4;
  }
  @media screen and (max-width:480px){
    .list{
      padding-left:0rem;
      padding:0 2rem;
    }
    .list li{
      text-align:center;
      margin-left: 0;
      margin-right: 0;
      border-bottom: 1px solid rgba(166,166,166,0.5);
      flex:0 0 100%;
    }
    .list li .info{
      text-align: left;
    }
    .list .info .tittle{
      font-size: 18px;
      padding-right:0;
    }
    .order:hover,
    .tittle:hover{
      opacity: 1;
    }
  }
</style>
