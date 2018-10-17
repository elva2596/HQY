<template lang="html">
  <div class="wrap">
    <ul class="content">
      <li v-for="(list,index) in pubArr" class="list-item">
          <div class="info">
            <span href="#" class="title item">{{list.tittle}}</span>
            <span class="time item">{{list.time}}</span>
            <!-- <span class="place item" v-if="list.place">{{list.place}}</span> -->
            <article class="desc item" v-html="list.desc"></article>
          </div>
          <div class="img">
            <img  :src="list.imgSrc" alt="">
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {getPublications} from "@/api"
import {mapState} from "vuex"
import ExhAndPubList from "@/front/components/ExhAndPubList"
export default {
  data(){
    return {
      ispointer:{
        cursor:"pointer"
      },
      initialPubArr:[],
    }
  },
  components:{
    ExhAndPubList
  },
  computed:{
    ...mapState(["isEn"]),
    pubArr(){
      if(this.isEn){
        return this.initialPubArr.map((item)=>({
          id:item._id,
          tittle:item.tittle_en,
          time:item.create_time_en,
          imgSrc:item.coverUrl,
          desc:item.content_en
        }))
      }else{
        return this.initialPubArr.map((item)=>({
          id:item._id,
          tittle:item.tittle_cn,
          time:item.create_time_cn,
          imgSrc:item.coverUrl,
          desc:item.content_cn
        }))
      }
    }
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
  async mounted(){
    const {data:{data}} = await getPublications()
    this.initialPubArr = data
  }
}
</script>

<style lang="css" scoped>
.wrap{
  /* height: 100%; */
  position: relative;
}
.content{
  position: absolute;
  top:14rem;
  width: 100%;
  padding: 0 3rem;
  font-size: 18px;
  /* font-family: "PingFangSC"; */
}
.info{
  text-align:center;
  width: calc(100% - 40rem);
  display: flex;
  flex-direction: column;
  justify-content: center;

}
.info .item{
  margin:1.4rem 0;
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
  width: 34rem;
}
.img img{
  display: block;
  width: 100%;
}
.time{
  color:#5A5A5A;
  font-size: 16px;
}
.desc{
  line-height:1.5em;
  font-size: 16px !important;
  color:#5A5A5A;
}
@media screen and (max-width:480px){
  .content{
    padding:2rem;
    font-size: 16px;
    top:12rem;
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
}
</style>
