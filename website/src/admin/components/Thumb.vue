<template lang="html">
  <el-col :span="2">
    <el-button @click="thumb">点我</el-button>
  </el-col>
</template>

<script>
import {mapMutations} from "vuex"
export default {
  methods:{
    ...mapMutations({
      thumb:"THUMB_COLLAPSE"
    })
  }
}
</script>

<style lang="css">
</style>
