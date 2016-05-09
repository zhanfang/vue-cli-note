<template>
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
            <span class="glyphicon glyphicon-arrow-up"></span>
            <span class="glyphicon glyphicon-arrow-down"></span>
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
      <ul class="filters">
        <li class="li"><a class="route" href="#/all" :class="{selected: visibility == 'all'}">All</a></li>
        <li class="li"><a class="route" href="#/active" :class="{selected: visibility == 'active'}">Active</a></li>
        <li class="li"><a class="route" href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a></li>
      </ul>
      <button class="clear-completed" @click="removeCompleted">
        Clear completed
      </button>
    </footer>
    <div class="top" @click="toTop">
      <span class="glyphicon glyphicon-arrow-up to-top"></span>
    </div>
</template>

<script>
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
  const doSave = function (value, type, name) {
    var blob
    if (typeof window.Blob === 'function') {
      blob = new Blob([value], {
        type: type
      })
    } else {
      var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder
      var bb = new BlobBuilder()
      bb.append(value)
      blob = bb.getBlob(type)
    }
    var URL = window.URL || window.webkitURL
    var bloburl = URL.createObjectURL(blob)
    var anchor = document.createElement('a')
    if ('download' in anchor) {
      anchor.style.visibility = 'hidden'
      anchor.href = bloburl
      anchor.download = name
      document.body.appendChild(anchor)
      var evt = document.createEvent('MouseEvents')
      evt.initEvent('click', true, true)
      anchor.dispatchEvent(evt)
      document.body.removeChild(anchor)
    } else if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, name)
    } else {
      location.href = bloburl
    }
  }

  function top () {
    document.getElementsByTagName('body')[0].scrollTop = 0
  }
  export default {
    data () {
      return {
        todos: [],
        visibility: 'all',
        query: '',
        detail: '',
        adding: false
      }
    },
    methods: {
      toggleStatus: function (todo) {
        todo.completed = !todo.completed
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
      },
      removeTodo: function (todo) {
        this.todos.$remove(todo)
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
        doSave(todo.detail, 'text/latex', now)
      },
      toTop: function () {
        top()
      }
    }
  }
</script>
<style scoped>
.todoapp{
  margin: 10px auto;
  padding: 0 15px;
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
.footer .filters{
	list-style: none;
	position: absolute;
	top: 50%;
	left: 200px;
	transform: translate3d(-50%, -50%, 0);
	padding: 0 0 0 80px;
}
.footer .filters .li{
	display: inline;
	padding-left: 10px;
}
.footer .filters .route{
	color: inherit;
	text-decoration: none;
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

.top{
	position: fixed;
	right: 20px;
	bottom: 30px;
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
@media screen and (max-width: 640px) {
	.container{
		margin: 0;
		padding: 0;
	}
	.main .todo{
		font-size: 12px;
		padding: 15px;
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
