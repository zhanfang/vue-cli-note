<template>
  <div class="row main">
    <div class="col-md-4 col-md-offset-4">
      <div class="form-group">
        <label>用户名</label>
        <input class="form-control" type="text" name="username" v-model="user.username">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input class="form-control" type="password" name="password" v-model="user.password">
      </div>
      <button class="btn btn-success btn-login" @click="clickLogin" :disabled="state">登陆</button>
      <button class="btn btn-default btn-register" @click="register">注册</button>
    </div>
  </div>
</template>
<script>
  import {login} from '../../vuex/actions'
  export default {
    vuex: {
      getters: {
        localuser: ({user}) => user.user
      },
      actions: {
        login
      }
    },
    data () {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      state () {
        return this.user.username.trim() === '' || this.user.password.trim() === ''
      }
    },
    methods: {
      clickLogin () {
        console.log(this.user)
        this.login(this.user)
      },
      register () {
        window.router.go('register')
      }
    }
  }
</script>
<style scoped>
  .main{
    padding-top: 150px;
  }
  .btn{
    width: 45%;
  }
  .btn-register{
    float: right;
  }
</style>
