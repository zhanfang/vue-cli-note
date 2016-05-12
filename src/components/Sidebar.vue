<template>
  <aside class="sidebar" v-show="slide" transition="sidebar">
    <div v-show="slide">
      <div class="title">
        这是标题
      </div>
      <div class="">
        <button @click="goHelp">markdown语法帮助</button>
      </div>
    </div>
  </aside>
  <div class="side">
    <span class="glyphicon glyphicon-align-justify" :class="{iconshow: slide}" @click="showAside"></span>
  </div>
</template>
<script>
  export default {
    props: ['slide'],
    methods: {
      goHelp: function () {
        window.router.go('help')
      },
      showAside: function () {
        this.slide = !this.slide
      }
    }
  }
</script>
<style scoped>
  .sidebar{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background: #34495e;
    font-size: 16px;
    color: #eeeeee;
  }
  .title{
    background: #31ADA0;
    color: #34495e;
  }
  .side{
    position: fixed;
    bottom: 50px;
    left: 20px;
    z-index: 3;
  }
  .glyphicon-align-justify{
    color: #34495e;
    font-size: 22px;
    cursor: pointer;
  }
  .iconshow{
    color: #eeeeee;
  }
</style>
