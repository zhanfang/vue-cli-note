<template>
  <div class="top" @click.prevent="toTop" v-show="isShowTop">
    <span class="glyphicon glyphicon-arrow-up to-top"></span>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isShowTop: false
      }
    },
    ready () {
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        if (window.scrollY > 200) {
          this.isShowTop = true
        } else {
          this.isShowTop = false
        }
      },
      toTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>
<style scoped>
.top{
  position: fixed;
  right: 20px;
  bottom: 50px;
}
.to-top{
  padding: 8px;
  border-radius: 100%;
  font-size: 20px;
  color: #34495e;
  background: #31ADA0;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.to-top:hover{
  opacity: 1;
}
</style>
