<template>
  <li class="todo animated" v-for="todo in todos | filterBy query in 'detail'" transition="bounce" :class="{completed: todo.completed, bounce: todo.completed}">
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
</template>

<script>
  import marked from 'marked'
  import tools from '../../utils/tools'
  import {saveTodos} from '../../vuex/actions.js'

  export default {
    vuex: {
      actions: {
        saveTodos
      }
    },
    props: ['todos', 'query', 'adding', 'cachetodo', 'detail'],
    methods: {
      toggleStatus: function (todo) {
        todo.completed = !todo.completed
        this.saveTodos(this.todos)
      },
      exportTodo: function (todo) {
        let now = new Date()
        now = now.getTime() + '.md'
        tools.doSave(todo.detail, 'text/latex', now)
      },
      editedTodo: function (todo) {
        this.cacheTodo = todo
        this.adding = true
        this.detail = todo.detail
      },
      removeTodo: function (todo) {
        this.todos.$remove(todo)
        this.saveTodos(this.todos)
      }
    },
    filters: {
      marked: marked
    }
  }
</script>
<style scoped>
.todo{
  position: relative;
  margin-bottom: 2px;
  padding: 15px 20px;
  list-style: none;
  font-size: 14px;
  color: #eeeeee;
  background: #34495e;
}
.main .todo:last-child{
  margin: 0;
}
.todo:hover .todo-control{
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
.completed{
	background: RGBA(44, 62, 80, 1.00);
}
.completed .glyphicon-ok{
	color: #34495e;
	background: #31ADA0;
}
.completed .content{
	color: #31ADA0;
}
.content{
	margin-left: 40px;
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
@media screen and (max-width: 640px) {
	.todo{
		font-size: 12px;
		padding: 15px;
	}
	.todo .content{
		margin: 0;
	}
	.glyphicon-ok{
		display: none;
	}
	.todo-control{
		font-size: 12px
	}
}
</style>
