<template>
  <div class="edit animated" id="test-editormd" v-show="adding" transition="updown">
    <div class="main">
      <textarea class="content" v-model="detail" debounce="500" placeholder="请使用markdown语法编辑笔记">
      </textarea>
      <div class="content preview">
        <div class="detail" v-html="detail | marked"></div>
      </div>
    </div>
    <div class="operate">
      <button class="btn btn-save" type="button" @click="save">保 存</button>
      <button class="btn btn-cancel" type="button" @click="cancelAdd">取 消</button>
    </div>
  </div>
</template>
<script>
  import marked from 'marked'
  export default {
    props: ['adding', 'detail', 'todos', 'cachetodo'],
    methods: {
      save: function () {
        const detail = this.detail.trim()
        if (!detail) return
        this.todos.unshift({
          detail: detail,
          completed: false
        })
        this.detail = ''
        this.adding = false
        const cacheTodo = this.cachetodo
        if (cacheTodo) {
          this.todos.$remove(cacheTodo)
          this.cacheTodo = null
        }
        const todos = JSON.stringify(this.todos)
        this.$http.post('/save', todos).then((res) => {
          console.log(res.data)
        })
      },
      cancelAdd: function () {
        const cacheTodo = this.cachetodo
        if (cacheTodo) {
          this.cacheTodo = null
        }
        this.detail = ''
        this.adding = false
      }
    },
    filters: {
      marked: marked
    }
  }
</script>
<style scoped>
.edit{
	padding: 10px 15px;
	background: #F0DDAA;
	color: #34495e;
	overflow: hidden;
}
.main{
  overflow: hidden;
}
.edit .title{
	width: 100%;
	margin-bottom: 10px;
	padding: 4px 10px;
	border: 0 none;
	border-radius: 3px;
	font-size: 16px;
	outline: none;
}
.edit .content{
  float: left;
	width: 49.5%;
	min-height: 510px;
	padding: 10px;
	margin-bottom: 10px;
	border: 0 none;
	border-radius: 5px;
	outline: none;
	background: #ffffff;
}
.edit .preview{
  float: right;
  color: #eeeeee;
  background: #34495e;
}
.edit .btn{
	float: right;
	padding: 5px 17px;
  margin-left: 7px;
	outline: none;
}
.edit .btn-save{
	background: RGBA(49, 173, 160, 1.00);
}
@media screen and (max-width: 640px) {
  .edit{
    padding: 5px;
  }
  .edit .content{
    width: 100%;
    min-height: 300px;
    margin: 0 0 5px 0;
  }
  .edit .preview{
    display: none;
  }
}
</style>
