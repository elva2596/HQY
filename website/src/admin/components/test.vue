<template lang="html">
  <div class="">
    <p v-for="item in 10" >{{item}} <span :ref="item"></span></p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
