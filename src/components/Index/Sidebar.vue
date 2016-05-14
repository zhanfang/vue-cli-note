<template>
  <aside class="sidebar" v-show="slide" transition="sidebar">
    <div v-show="slide">
      <div class="title">
        导航
      </div>
      <ul class="list">
        <li class="item" @click="goTo('todos')">笔记列表</li>
        <li class="item" @click="goTo('help')">md语法帮助</li>
        <li class="item" @click="goTo('user')">用户中心</li>
      </ul>
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
      goTo: function (url) {
        window.router.go(url)
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
    width: 200px;
    background: #333333;
    color: #eeeeee;
  }
  .title{
    padding: 15px 20px;
    font-weight: bold;
    font-size: 18px;
    background: #31ADA0;
    color: #34495e;
  }
  .list{
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }
  .list .item{
    padding: 15px 20px;
    margin-bottom: 2px;
    background: #34495e;
    color: #eeeeee;
    cursor: pointer;
  }
  .list .item:hover{
    color: #ffffff;
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
  @media screen and (max-width: 640px) {
    .sidebar{
      width: 70px;
    }
    .title{
      padding: 11px;
      font-size: 14px;
    }
    .list{
      font-size: 12px;
    }
    .list .item{
      padding: 10px;
    }
    .glyphicon-align-justify{
      color: #F0DDAA;
    }
  }
</style>
