<template>
  <div class="app">
    <Msg></Msg>
    <router-view></router-view>
  </div>
</template>
<script>
  import store from './vuex/store'
  import Msg from './components/Msg/Msg'
  export default {
    store,
    components: {
      Msg
    }
  }
</script>
<style src="./assets/css/animate.css"></style>
<style src="./assets/css/bootstrap.css"></style>
<style src="./assets/css/markdown.css"></style>
<style src="./assets/css/vue-animate.css"></style>
<style scoped>
  .app{
    padding: 15px 60px;
    margin: 0;
    overflow: hidden;
  }
  @media screen and (max-width: 640px) {
  	.app{
  		margin: 0;
  		padding: 0;
  	}
  }
</style>
