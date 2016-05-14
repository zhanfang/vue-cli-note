<template>
  <div class="msg" transition="alert" v-show="msg.type">
    <span class="glyphicon glyphicon-exclamation-sign"></span>
    <span>{{msg.content}}</span>
  </div>
</template>
<script>
  export default {
    vuex: {
      getters: {
        msg: ({message}) => message.msg
      }
    }
  }
</script>
<style scoped>
  .msg{
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    z-index: 3;
    padding: 6px 30px;
    border-radius: 7px;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
    background: #ffffff;
  }
  .glyphicon-exclamation-sign{
    padding-right: 10px;
  }
  .alert-transition{
    transition: all .3s ease;
  }
  .alert-enter{
    top: 0;
    opacity: 0;
  }
  .alert-leave{
    top: 0;
    opacity: 0;
  }
</style>