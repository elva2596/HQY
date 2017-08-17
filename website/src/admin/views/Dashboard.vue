<template lang="html">
  <div class="">
    <h1>Dashboard!!!</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  computed:{
    ...mapState(["token"])
  }
}
</script>

<style lang="css">
</style>
