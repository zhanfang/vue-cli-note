<template>
  <Sidebar :slide.sync="slide"></Sidebar>

  <div class="all" :class="{onShow: slide}">
    <router-view></router-view>
  </div>

  <Scrolltop></Scrolltop>
</template>

<script>
  import Scrolltop from './Scrolltop'
  import Sidebar from './Sidebar'
  export default {
    data () {
      return {
        slide: false
      }
    },
    components: {
      Scrolltop,
      Sidebar
    }
  }
</script>
<style scoped>
  .all{
    margin: 0 auto;
    transition: all .3s;
  }
  .onShow{
    padding-left: 150px;
  }
  @media screen and (max-width: 640px) {
  }
</style>
