<template>
  <div class="row main">
    <div class="col-md-4 col-md-offset-4">
      <div class="form-group">
        <label>用户名</label>
        <input class="form-control" type="text" name="username" v-model="user.username" placeholder="必须长于4字节">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input class="form-control" type="password" name="password" v-model="user.password" placeholder="必须长于8字节">
      </div>
      <div class="form-group">
        <label>请重新输入密码</label>
        <input class="form-control" type="password" name="repassword" v-model="repassword" placeholder="必填字段">
      </div>
      <button class="btn btn-success btn-register" @click="registerClick" :disabled="!state">注册</button>
      <button class="btn btn-default btn-login" @click="login">登陆</button>
    </div>
  </div>
</template>
<script>
  import {register, getUserStatus} from '../../vuex/actions.js'
  export default {
    vuex: {
      getters: {
        localuser: ({user}) => user.user
      },
      actions: {
        register, getUserStatus
      }
    },
    created () {
      if (this.localuser === '') {
        this.getUserStatus()
      }
    },
    data () {
      return {
        user: {
          username: '',
          password: ''
        },
        repassword: ''
      }
    },
    computed: {
      state () {
        return this.user.username.trim().length >= 4 && this.user.password.trim().length >= 8 && this.user.password === this.repassword
      }
    },
    methods: {
      registerClick () {
        this.register(this.user)
      },
      login () {
        window.router.go('login')
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
  .btn-login{
    float: right;
  }
</style>
