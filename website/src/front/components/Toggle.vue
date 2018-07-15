<template lang="html">
  <div class="toggle" >
    <a class="cn" @click="toggleTo_cn" :class="{isEn}" :style="styleobjcn">中文</a>
    <a class="en" @click="toggleTo_en" :class="{isEn:!isEn}" :style="styleobjen">English</a>
  </div>
</template>

<script>
export default {
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

  /*同级元素同时设置position不等于static时候，后面覆盖前面，当设置后面的z-index值大于前面的时候，前面元素中的子元素的z-index
  设置的在大也没用
  */
}
.toggle .cn{
  display: inline-block;
  margin-right: 1rem;
  color:#818181;
}
.toggle .en{
  color:#818181;
}
.toggle .isEn{
  opacity: 0.5;
}
@media screen and (max-width:480px){
  .toggle .cn,
  .toggle .en{
    font-size: 14px;
  }
}
</style>
