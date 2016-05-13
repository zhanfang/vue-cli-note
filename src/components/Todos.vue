<template>
  <div class="all animated" :class="{onShow: slide}" transition="bounce">
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

      <Editmd :adding.sync="adding" :todos.sync="todos" :detail.sync="detail" :cachetodo.sync="cacheTodo"></Editmd>

      <ul class="main">
        <Todo :adding.sync="adding" :todos.sync="filteredTodos" :detail.sync="detail" :cachetodo.sync="cacheTodo" :query.sync="query"></Todo>
      </ul>
    </div>
    <footer class="footer" v-show="todos.length">
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
  import Todo from './Todo'
  import Editmd from './Editmd'

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
      Todo,
      Editmd
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
        adding: false,
        cacheTodo: null
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
      toggleAll: function () {
        const done = this.allDone
        this.todos.forEach(function (todo) {
          todo.completed = !done
        })
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos)
        const todos = JSON.stringify(this.todos)
        this.$http.post('/save', todos).then((res) => {
          console.log(res.data)
        })
      },
      changeAdding: function () {
        this.adding = !this.adding
      },
      selectAll: function () {
        this.visibility = 'all'
      },
      selectActive: function () {
        this.visibility = 'active'
      },
      selectCompleted: function () {
        this.visibility = 'completed'
      }
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
.main{
	margin: 0px;
	padding: 0;
	background: RGBA(44, 62, 80, 1.00);
	color: #ffffff;
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
	.footer .todo-count{
		margin: 0;
	}
	.footer .filters{
		display: none;
	}
}
</style>
