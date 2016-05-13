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
      <button class="btn btn-success btn-login" @click="login" :disabled="state">登陆</button>
      <button class="btn btn-default btn-register" @click="register">注册</button>
    </div>
  </div>
</template>
<script>
  export default {
    ready () {
      this.$http.get('getStatus').then(res => {
        this.$set('status', res.data.success)
        if (res.data.success === 200) {
          window.router.go('/index/todos')
        }
      })
    },
    data () {
      return {
        status: 0,
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
      login () {
        const user = this.user
        this.$http.post('login/', user).then((res) => {
          window.status = res.data.success
          if (res.data.success === 200) {
            window.router.go('index/todos')
          }
        }, function (res) {
          this.error = res.data.success
        })
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
