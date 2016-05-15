<template>
  <li class="todo animated" transition="bounce">
    <span class="glyphicon glyphicon-ok"></span>
    <div class="content">
      <div class="detail" v-html="detail | marked"></div>
    </div>
    <div class="todo-control">
      <span class="glyphicon glyphicon-download-alt" @click="exportTodo(todo)"></span>
    </div>
  </li>
</template>

<script>
  import marked from 'marked'
  import tools from '../../utils/tools'

  export default {
    data () {
      return {
        detail: "# Markdown 语法和 MWeb 写作使用说明\n\n## Markdown 的设计哲学\n\n> Markdown 的目標[meta](media/14269478334488/meta.md)是實現「易讀易寫」。\n> 不過最需要強調的便是它的可讀性。一份使用 Markdown 格式撰寫的文件應該可以直接以純文字發佈，並且看起來不會像是由許多標籤或是格式指令所構成。\n> Markdown 的語法有個主要的目的：用來作為一種網路內容的*寫作*用語言。\n\n<!-- more -->\n\n## 本文约定\n\n如果有写 `效果如下：`， 在 MWeb 编辑状态下只有用 `CMD + R` 预览才可以看效果。\n\n## 标题\n\nMarkdown 语法：\n\n```\n# 第一级标题 `<h1>` \n## 第二级标题 `<h2>` \n###### 第六级标题 `<h6>` \n```\n\n效果如下：\n\n# 第一级标题 `<h1>` \n## 第二级标题 `<h2>` \n###### 第六级标题 `<h6>` \n\n\n\n## 强调\n\nMarkdown 语法：\n\n```\n*这些文字会生成`<em>`*\n_这些文字会生成`<u>`_\n\n**这些文字会生成`<strong>`**\n__这些文字会生成`<strong>`__\n```\n\n在 MWeb 中的快捷键为： `CMD + U`、`CMD + I`、`CMD + B`\n效果如下：\n\n*这些文字会生成`<em>`*\n_这些文字会生成`<u>`_\n\n**这些文字会生成`<strong>`**\n__这些文字会生成`<strong>`__\n\n## 换行\n\n四个及以上空格加回车。\n如果不想打这么多空格，只要回车就为换行，请勾选：`Preferences` - `Themes` - `Translate newlines to <br> tags`\n\n## 列表\n\n### 无序列表\n\nMarkdown 语法：\n\n```\n* 项目一 无序列表 `* + 空格键`\n* 项目二\n\t* 项目二的子项目一 无序列表 `* + TAB + 空格键`\n\t* 项目二的子项目二\n```\n\n在 MWeb 中的快捷键为： `Option + U`\n效果如下：\n\n* 项目一 无序列表 `* + 空格键`\n* 项目二\n\t* 项目二的子项目一 无序列表 `* + TAB + 空格键`\n\t* 项目二的子项目二\n\n### 有序列表\n\nMarkdown 语法：\n\n```\n1. 项目一 有序列表 `数字 + . + 空格键`\n2. 项目二 \n3. 项目三\n\t1. 项目三的子项目一 有序列表 `数字 + . + TAB + 空格键`\n\t2. 项目三的子项目二\n```\n\n效果如下：\n\n1. 项目一 有序列表 `数字 + . + 空格键`\n2. 项目二 \n3. 项目三\n\t1. 项目三的子项目一 有序列表 `数字 + . + TAB + 空格键`\n\t2. 项目三的子项目二\n\n### 任务列表（Task lists）\n\nMarkdown 语法：\n\n```\n- [ ] 任务一 未做任务 `- + 空格 + [ ]`\n- [x] 任务二 已做任务 `- + 空格 + [x]`\n```\n\n效果如下：\n\n- [ ] 任务一 未做任务 `- + 空格 + [ ]`\n- [x] 任务二 已做任务 `- + 空格 + [x]`\n\n## 图片\n\nMarkdown 语法：\n\n```\n![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)\n格式: ![Alt Text](url)\n```\n\n`Control + Shift + I` 可插入Markdown语法。\n如果是 MWeb 的文档库中的文档，还可以用拖放图片、`CMD + V` 粘贴、`CMD + Option + I` 导入这三种方式来增加图片。\n效果如下：\n\n![GitHub set up](http://zh.mweb.im/asset/img/set-up-git.gif)\n\n## 链接\n\nMarkdown 语法：\n\n```\nemail <example@example.com>\n[GitHub](http://github.com)\n自动生成连接 <http://www.github.com/>\n```\n\n`Control + Shift + L` 可插入Markdown语法。\n如果是 MWeb 的文档库中的文档，拖放或`CMD + Option + I` 导入非图片时，会生成连接。\n效果如下：\n\nEmail 连接： <example@example.com>\n[连接标题Github网站](http://github.com)\n自动生成连接像： <http://www.github.com/> 这样\n\n## 区块引用\n\nMarkdown 语法：\n\n```\n某某说:\n> 第一行引用\n> 第二行费用文字\n```\n\n`Control + B` 可插入Markdown语法。\n效果如下：\n\n某某说:\n> 第一行引用\n> 第二行费用文字\n\n## 行内代码\n\nMarkdown 语法：\n\n```\n像这样即可：`<addr>` `code`\n```\n\n`CMD + K` 可插入Markdown语法。\n效果如下：\n\n像这样即可：`<addr>` `code`\n\n## 多行或者一段代码\n\nMarkdown 语法：\n\n\t```js\n\tfunction fancyAlert(arg) {\n\t if(arg) {\n\t $.facebox({div:'#foo'})\n\t }\n\n\t}\n\t```\n\n`CMD + Shift + K` 可插入Markdown语法。\n效果如下：\n\n```js\nfunction fancyAlert(arg) {\n\tif(arg) {\n\t\t$.facebox({div:'#foo'})\n\t}\n\t\n}\n```\n\n## 顺序图或流程图\n\nMarkdown 语法：\n\n\t```sequence\n\t张三->李四: 嘿，小四儿, 写博客了没?\n\tNote right of 李四: 李四愣了一下，说：\n\t李四-->张三: 忙得吐血，哪有时间写。\n\t```\n\n\t```flow\n\tst=>start: 开始\n\te=>end: 结束\n\top=>operation: 我的操作\n\tcond=>condition: 确认？\n\n\tst->op->cond\n\tcond(yes)->e\n\tcond(no)->op\n\t```\n\n效果如下（ `Preferences` - `Themes` - `Enable sequence & flow chart` 才会看到效果 ）：\n\n```sequence\n张三->李四: 嘿，小四儿, 写博客了没?\nNote right of 李四: 李四愣了一下，说：\n李四-->张三: 忙得吐血，哪有时间写。\n```\n\n```flow\nst=>start: 开始\ne=>end: 结束\nop=>operation: 我的操作\ncond=>condition: 确认？\n\nst->op->cond\ncond(yes)->e\ncond(no)->op\n```\n\n更多请参考：<http://bramp.github.io/js-sequence-diagrams/>, <http://adrai.github.io/flowchart.js/>\n\n## 表格\n\nMarkdown 语法：\n\n```\n第一格表头 | 第二格表头\n--------- | -------------\n内容单元格 第一列第一格 | 内容单元格第二列第一格\n内容单元格 第一列第二格 多加文字 | 内容单元格第二列第二格\n```\n\n效果如下：\n\n第一格表头 | 第二格表头\n--------- | -------------\n内容单元格 第一列第一格 | 内容单元格第二列第一格\n内容单元格 第一列第二格 多加文字 | 内容单元格第二列第二格\n\n\n## 删除线\n\nMarkdown 语法：\n\n\t加删除线像这样用： ~~删除这些~~\n\n效果如下：\n\n加删除线像这样用： ~~删除这些~~\n\n## 分隔线\n\n以下三种方式都可以生成分隔线：\n\n\t***\n\n\t*****\n\n\t- - -\n\n效果如下：\n\n***\n\n*****\n\n- - -\n\n\n## MathJax\n\nMarkdown 语法：\n\n\n```\n块级公式：\n$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$\n\n\\\\[ \\frac{1}{\\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\\frac25 \\pi}} =\n1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } } \\\\]\n\n行内公式： $\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$\n```\n\n效果如下（`Preferences` - `Themes` - `Enable MathJax` 才会看到效果）：\n\n块级公式：\n$$\tx = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} $$\n\n\\\\[ \\frac{1}{\\Bigl(\\sqrt{\\phi \\sqrt{5}}-\\phi\\Bigr) e^{\\frac25 \\pi}} =\n1+\\frac{e^{-2\\pi}} {1+\\frac{e^{-4\\pi}} {1+\\frac{e^{-6\\pi}}\n{1+\\frac{e^{-8\\pi}} {1+\\ldots} } } } \\\\]\n\n\n行内公式： $\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N$\n\n\n## 脚注（Footnote）\n\nMarkdown 语法：\n\n```\n这是一个脚注：[^sample_footnote]\n```\n\n效果如下：\n\n这是一个脚注：[^sample_footnote]\n\n[^sample_footnote]: 这里是脚注信息\n\n\n## 注释和阅读更多\n\n<!-- comment -->\n<!-- more -->\nActions->Insert Read More Comment *或者* `Command + .`\n**注** 阅读更多的功能只用在生成网站或博客时。\n\n## TOC\n\nMarkdown 语法：\n\n```\n[TOC]\n```\n\n效果如下：\n\n[TOC]"
      }
    },
    methods: {
      exportTodo: function (todo) {
        let now = new Date()
        now = now.getTime() + '.md'
        tools.doSave(todo.detail, 'text/latex', now)
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
