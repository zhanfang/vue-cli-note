<template>
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
</template>

<script>
  import marked from 'marked'
  import tools from '../utils/tools'

  export default {
    props: ['filteredTodos', 'query'],
    methods: {
      exportTodo: function (todo) {
        let now = new Date()
        now = now.getTime() + '.md'
        tools.doSave(todo.detail, 'text/latex', now)
      },
      removeTodo: function (todo) {
        this.todos.$remove(todo)
        const todos = JSON.stringify(this.todos)
        this.$http.post('save', todos).then((res) => {
          console.log(res.data)
        })
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
	padding: 15px 20px;
	list-style: none;
	font-size: 14px;
  color: #ffffff;
	background: #34495e;
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
.content .title{
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
