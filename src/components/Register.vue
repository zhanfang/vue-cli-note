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
        <input class="form-control" type="password" name="repassword" v-model="user.repassword" placeholder="必填字段">
      </div>
      <button class="btn btn-success btn-register" @click="register" :disabled="!state">注册</button>
      <button class="btn btn-default btn-login" @click="login">登陆</button>
    </div>
  </div>
</template>
<script>
  export default {
    ready () {
      this.$http.get('getStatus').then(res => {
        this.$set('status', res.data.success)
        if (res.data.success === 200) {
          window.location.href = 'index/todos'
        }
      })
    },
    data () {
      return {
        user: {
          status: 0,
          username: '',
          password: '',
          repassword: ''
        }
      }
    },
    computed: {
      state () {
        return this.user.username.trim().length >= 4 && this.user.password.trim().length >= 8 && this.user.password === this.user.repassword
      }
    },
    methods: {
      register () {
        const user = this.user
        this.$http.post('register/', user).then((res) => {
          console.log(res.data)
          if (res.data.success === 200) {
            window.router.go('index/todos')
          }
        }, function (res) {
          this.error = res
        })
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
