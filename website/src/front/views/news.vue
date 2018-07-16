<template lang="html">
  <div class="wrap">
    <ul class="content news">
      <li v-for="item in newsArr">
        <h3 class="tittle">{{item.tittle}}</h3>
        <article class="news-texts" v-html="item.content">

        </article>
      </li>
    </ul>
  </div>
</template>

<script>
import {getNews} from "@/api"
import { mapActions,mapState} from 'vuex'
export default {
  data(){
    return {
      arr:[
        {tittle:"A",content:"aaaaaaaaaaa"},
        {tittle:"B",content:"bbbbbbbbbb"}
      ]
    }
  },
  created(){
    this.getAllNews()
  },
  computed:{
    ...mapState(["newsLists","isEn"]),
    newsArr(){
      if(this.isEn){
        return this.newsLists.map(item=>({
            id:item._id,
            tittle:item.tittle_en,
            content:item.content_en
        }))
      }else{
        return this.newsLists.map(item=>({
            id:item._id,
            tittle:item.tittle_cn,
            content:item.content_cn
        }))
      }
    }
  },
  methods:{
    ...mapActions(["getAllNews"])
  }
}
</script>

<style lang="css" scoped>
  .wrap{
    /* padding-top: 14rem; */
    height: 100%;
    position: relative;
      /* background: rgba(247,247,247,1); */
    /* display: flex; */
  }
  .content{
    margin-top: 4rem;
    /* height: 100%; */
    position: absolute;
    padding: 0 3rem;
    top: 10rem;

    /* background: red; */
    text-align: left;
    width: 100%;
    font-size: 24px;
    font-family: "PingFangSC";
  }
  .content h3{
    margin-bottom: 3rem;
    font-size: 20px;
  }
  .news li{
    margin-bottom: 6rem;
  }
  @media screen and (max-width:480px){
    .content{
      padding: 0 2rem;
    }
    .content h3{
      font-size: 18px;
    }
  }
</style>
