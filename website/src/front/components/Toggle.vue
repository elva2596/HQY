<template lang="html">
  <div class="toggle" >
    <a class="cn" @click="toggleTo_cn" :class="{isEn}" :style="styleobjcn">胡庆雁</a>
    <!-- <a class="cn" @click="toggleTo_cn" :class="{isEn}" :style="styleobjcn">曹雨</a> -->
    <span class="cn_link"></span>
    <a class="en" @click="toggleTo_en" :class="{isEn:!isEn}" :style="styleobjen">HUQINGYAN</a>
    <!-- <a class="en" @click="toggleTo_en" :class="{isEn:!isEn}" :style="styleobjen">CAOYU</a> -->
  </div>
</template>

<script>
import {author} from "@/config"
export default {
  data(){
    return {
      author
    }
  },
  props:{
    toggleTo_cn:{
      type:Function,
      default:()=>{}
    },
    toggleTo_en:{
      type:Function,
      default:()=>{}
    },
    isEn:{
      type:Boolean,
      default:false
    },
    styleobjcn:{
      type:Object,
      default:()=>({})
    },
    styleobjen:{
      type:Object,
      default:()=>({})
    }
  }
}
</script>

<style lang="css" scoped>
.toggle{
  /* width: 1.8rem; */
  cursor:pointer;
  z-index: 999;
font-size: 16px;
  /*同级元素同时设置position不等于static时候，后面覆盖前面，当设置后面的z-index值大于前面的时候，前面元素中的子元素的z-index
  设置的在大也没用
  */
}
.toggle .cn{
  display: inline-block;
  margin-right: .4rem;
  color:rgb(90, 90, 90);
}
.cn_link {
  display: inline-block;
  /* margin-left: 6px; */
  /* margin-top: 2px; */
  /* transform: translateY(1px); */
  width: 2px;
  height: 12px;
  background: #818181 !important;
}
.toggle .en{
  color:rgb(90, 90, 90);
}
.toggle .isEn{
  opacity: 0.5;
}
@media screen and (max-width:480px){
  .toggle .cn,
  .toggle .en{
    font-size: 14px;
  }

  .cn_link {
    height: 10px;
  }
}
</style>
