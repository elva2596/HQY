<template lang="html">
  <ul class="container">
    <li v-for="(list,index) in lists" class="list-item">
        <div class="info">
          <span class="order"
                @click="linkTo(list.id)"
                >
                {{index}}
          </span>
          <span href="#"
                @click.prevent="linkTo(list.id)"
                class="title"
                :style="ispointer"
                >
                {{list.tittle}}
          </span>
          <span class="time">{{list.time}}</span>
          <span class="place" v-if="list.place">{{list.place}}</span>
          <article class="desc" v-html="list.desc">

          </article>
        </div>
        <div class="img">
          <img  :src="list.imgSrc" alt="">
        </div>
    </li>
  </ul>
</template>

<script>
export default {
  props:{
    lists:Array,
    ispointer:Object,
    linkTo:{
      type:Function,
      default:()=>{}
    }
  },
  filters:{
    formatNumber(number){
      console.log(number)
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
    }
  },
}
</script>

<style lang="css" scoped>
  .container{
    /* padding: 0 3rem; */
  }
  .list-item{
    height: 63rem;
    background: red;
    margin-bottom: 20rem;
    display: flex;
    justify-content: space-between;

  }
  .list-item .img{
    /* height: 63rem; */
    width: 51rem;
    background:blue;
  }
  .list-item .img img{
    display: block;
    /* height: 100%; */
    width: 100%;

  }
</style>
