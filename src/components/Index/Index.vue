<template>
  <Sidebar :slide.sync="slide" :user="user"></Sidebar>

  <div class="all" :class="{onShow: slide}">
    <router-view></router-view>
  </div>

  <Scrolltop></Scrolltop>
</template>

<script>
  import Scrolltop from './Scrolltop'
  import Sidebar from './Sidebar'
  import {getUser} from '../../vuex/actions.js'
  export default {
    vuex: {
      getters: {
        user: ({user}) => user.user
      },
      actions: {
        getUser
      }
    },
    created () {
      if (this.user === '') {
        this.getUser()
      }
    },
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
    .onShow{
      padding-left: 70px;
    }
  }
</style>
