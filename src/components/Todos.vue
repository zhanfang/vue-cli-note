<template>
  <div class="all" :class="{onShow: slide}">
    <div class="todoapp">
      <header class="header">
        <span class="glyphicon glyphicon-plus" @click="changeAdding"></span>
        <span class="glyphicon glyphicon-search"></span>
        <input class="search"
          placeholder="Search..."
          autofocus autocomplete="off"
          v-model="query"
        >
      </header>
      <div class="edit animated" v-show="adding" transition="updown">
        <textarea class="content" v-model="detail" debounce="500" placeholder="请使用markdown语法编辑笔记">
        </textarea>
        <button class="btn btn-save" type="button" @click="save">保 存</button>
        <button class="btn btn-cancel" type="button" @click="cancelAdd">取 消</button>
      </div>
      <ul class="main" v-cloak>
        <li class="todo animated" v-for="todo in filteredTodos | filterBy query in 'detail'" transition="bounce" :class="{completed: todo.completed, bounce: todo.completed}">
          <span class="glyphicon glyphicon-ok" @click="toggleStatus(todo)"></span>
          <div class="content" @dblclick="editedTodo(todo)">
            <div class="detail" v-html="todo.detail | marked"></div>
          </div>
          <div class="todo-control">
            <span class="glyphicon glyphicon-pencil" @click="editedTodo(todo)"></span>
            <span class="glyphicon glyphicon-remove" @click="removeTodo(todo)"></span>
            <span class="glyphicon glyphicon-download-alt" @click="exportTodo(todo)"></span>
          </div>
        </li>
      </ul>
    </div>
    <footer class="footer" v-show="todos.length" v-cloak>
      <span class="glyphicon glyphicon-ok" :class="{okAll: allDone}" @click="toggleAll()"></span>
      <span class="todo-count">
        <strong v-text="remaining"></strong> {{remaining | pluralize 'item'}} left
      </span>
      <button class="btn-footer" :class="{selected: visibility == 'all'}" @click="selectAll">All</button>
      <button class="btn-footer" :class="{selected: visibility == 'active'}" @click="selectActive">Active</button>
      <button class="btn-footer" :class="{selected: visibility == 'completed'}" @click="selectCompleted">Completed</button>
      <button class="clear-completed" @click="removeCompleted">
        Clear completed
      </button>
    </footer>
  </div>
</template>
</script>
<script>
  import marked from 'marked'
  import Todo from './Todo'
  import tools from '../utils/tools'
  const filters = {
    all: function (todos) {
      return todos
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed
      })
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed
      })
    }
  }
  export default {
    components: {
      Todo
    },
    ready: function () {
      this.$http.get('/todos').then((res) => {
        this.$set('todos', res.data[0].todos)
      })
    },
    data () {
      return {
        status: 0,
        todos: [],
        visibility: 'all',
        query: '',
        detail: '',
        adding: false
      }
    },
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos)
      },
      remaining: function () {
        return filters.active(this.todos).length
      },
      allDone: {
        get: function () {
          return this.remaining === 0
        }
      }
    },
    methods: {
      toggleStatus: function (todo) {
        todo.completed = !todo.completed
        const todos = JSON.stringify(this.todos)
        this.$http.post('save', todos).then((res) => {
          console.log(res.data)
        })
      },
      toggleAll: function () {
        const done = this.allDone
        this.todos.forEach(function (todo) {
          todo.completed = !done
        })
      },
      save: function () {
        const detail = this.detail.trim()
        if (!detail) return
        this.todos.unshift({
          detail: detail,
          completed: false
        })
        this.detail = ''
        this.adding = false
        const cacheTodo = this.cacheTodo
        if (cacheTodo) {
          this.todos.$remove(cacheTodo)
          this.cacheTodo = null
        }
        const todos = JSON.stringify(this.todos)
        this.$http.post('save', todos).then((res) => {
          console.log(res.data)
        })
      },
      removeTodo: function (todo) {
        this.todos.$remove(todo)
        const todos = JSON.stringify(this.todos)
        this.$http.post('save', todos).then((res) => {
          console.log(res.data)
        })
      },
      cancelAdd: function () {
        const cacheTodo = this.cacheTodo
        if (cacheTodo) {
          this.cacheTodo = null
        }
        this.detail = ''
        this.adding = false
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos)
        const todos = JSON.stringify(this.todos)
        this.$http.post('save', todos).then((res) => {
          console.log(res.data)
        })
      },
      changeAdding: function () {
        this.adding = !this.adding
      },
      editedTodo: function (todo) {
        this.cacheTodo = todo
        this.adding = true
        this.detail = todo.detail
      },
      exportTodo: function (todo) {
        let now = new Date()
        now = now.getTime() + '.md'
        tools.doSave(todo.detail, 'text/latex', now)
      },
      selectAll: function () {
        this.visibility = 'all'
      },
      selectActive: function () {
        this.visibility = 'active'
      },
      selectCompleted: function () {
        this.visibility = 'completed'
      },
      showAside: function () {
        this.slide = !this.slide
      }
    },
    filters: {
      marked: marked
    }
  }
</script>
<style scoped>
.all{
  margin: 0 auto;
  transition: all .5s;
}
.onShow{
  margin-left: 150px;
}
.todoapp{
	border-radius: 6px;
}
.header{
	position: relative;
	background: #31ADA0;
	border-radius: 6px 6px 0 0;
	padding: 20px;
	font-size: 20px;
	color: #34495e;
}
.header .search{
	padding-left: 15px;
	background: none;
	border: 0 none;
	box-shadow: none;
	outline: 0 none;
	font-weight: 700;
}
.header .search::-webkit-input-placeholder{
	color: RGBA(52, 73, 94, .8)
}
.glyphicon-plus{
	position: absolute;
	top: 50%;
	right: 20px;
	transform: translate3d(0, -50%, 0);
	cursor: pointer;
}
.edit{
	padding: 10px 20px;
	background: #F0DDAA;
	color: #34495e;
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
	width: 100%;
	min-height: 300px;
	padding: 10px;
	margin-bottom: 5px;
	border: 0 none;
	border-radius: 5px;
	outline: none;
	background: #ffffff;
}
.edit .btn{
	float: right;
	padding: 5px 17px;
	margin-left: 10px;
	outline: none;
}
.edit .btn-save{
	background: RGBA(49, 173, 160, 1.00);
}
.main{
	margin: 0px;
	padding: 0;
	background: RGBA(44, 62, 80, 1.00);
	color: #ffffff;
}
.main .todo{
	position: relative;
	margin-bottom: 2px;
	padding: 15px 20px;
	list-style: none;
	font-size: 14px;
	background: #34495e;
}
.main .todo:last-child{
	margin: 0;
}
.main .todo:hover .todo-control{
	top: 10px;
	opacity: 1;
}
.todo-control{
	position: absolute;
	top: -10px;
	right: 20px;
	font-size: 18px;
	color: #ffffff;
	opacity: 0;
	transition: .3s ease-in-out;
}
.todo-control .glyphicon{
	padding-left: 5px;
	opacity: 0.6;
}
.todo-control .glyphicon:hover{
	opacity: 1;
}
.main .completed{
	background: RGBA(44, 62, 80, 1.00);
}
.main .completed .glyphicon-ok{
	color: #34495e;
	background: #31ADA0;
}
.main .completed .content{
	color: #31ADA0;
}
.main .content{
	margin-left: 40px;
}
.main .content .title{
	display: block;
	border: 0 none;
	background: none;
	font-size: 20px;
	margin-bottom: 10px;
	outline: none;
}

.glyphicon-ok{
	position: absolute;
	top:50%;
	transform: translate3d(0,-50%,0);
	padding: 4px;
	font-size: 14px;
	border-radius: 50%;
	background: #ffffff;
	color: rgba(255, 255, 255, 0);
	cursor: pointer;
}
.okAll{
	cursor: pointer;
	color: #31ADA0;
	background: #34495e;
}
.footer{
	position: relative;
	padding: 15px 20px;
	background: #31ADA0;
	color: #34495e;
	border-radius: 0 0 6px 6px;
}

.footer .clear-completed{
	float: right;
	padding: 0;
	border: 0 none;
	background: #31ADA0;
	outline: none;
}
.footer .todo-count{
	margin-left: 40px;
}
.btn-footer{
  background: none;
  border: 0 none;
  outline: none;
}
.footer .selected{
  color: #eeeeee;
}
@media screen and (max-width: 640px) {
  .header{
    font-size: 14px;
    padding: 10px;
  }
  .header .search{

    width: 200px;
  }
	.main .todo{
		font-size: 12px;
	}
	.main .todo .content{
		margin: 0;
	}
	.glyphicon-ok{
		display: none;
	}
	.todo-control{
		font-size: 12px
	}
	.footer .todo-count{
		margin: 0;
	}
	.footer .filters{
		display: none;
	}
}
</style>
