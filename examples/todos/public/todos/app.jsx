
import React from 'react'
import governor from 'governor'
import TodoStore from './todo_store'
import TodoApp from './components.jsx!'

governor({
  todos: TodoStore
}, function(data) {
  React.render(<TodoApp {...data} />, document.getElementById('todos'))
})
