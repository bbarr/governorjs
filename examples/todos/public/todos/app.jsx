
import R from 'ramda'
import React from 'react'
import Governor from 'governor'

import TodoStore from './todo_store'

var highlightMixin = { // stash
  componentDidUpdate: function() {
    var el = this.getDOMNode()
    if (el.classList.contains('highlight')) return
    el.classList.add('highlight')
    setTimeout(function() { el.classList.remove('highlight') }, 100)
  }
}

var stateHistory = [] // stash

var TodoApp = React.createClass({

  mixins: [ 
    Governor.rootMixin([
      [ 'todos', TodoStore ]
    ])
  ],

  render: function() {

    stateHistory.push(this.state) // stash

    var hub = this.props.hub
    var todos = this.state.todos

    var list = todos.list.map(function(todo) {
      return <Item key={todo.id} isEditing={todos.editBuffer[todo.id]} todo={todo} hub={hub} />
    })

    return (
      <div id="todo-app-component">
        <StateHistory onRecreate={R.unary(this.setState.bind(this)) /* stash */} /> 
        <h3>Todo Example</h3>
        <ItemInput
          onSubmit={hub.bind('CREATE_TODO')}
          value={todos.pending}
          onChange={R.compose(hub.bind('SET_PENDING'), R.path('target.value'))}
        />
        { list }
      </div>
    )
  }
})

var ItemInput = React.createClass({

  mixins: [ Governor.childMixin('value'), highlightMixin ], // stash

  render: function() {
    return (
      <form onSubmit={R.compose(this.props.onSubmit, R.invoker(0, 'preventDefault'))}>
        <input type="text" value={this.props.value} onChange={this.props.onChange} />
      </form>
    )
  }
})

var Item = React.createClass({

  mixins: [ Governor.childMixin('todo', 'isEditing'), highlightMixin ], // stash

  patchText: function(e) {
    this.props.hub.emit('PATCH_TODO', this.props.todo, { text: e.target.value })
  },

  renderForEditing: function() {

    var hub = this.props.hub
    var todo = this.props.todo 

    return (
      <div>
        <ItemInput
          onChange={this.patchText}
          value={todo.text}
          onSubmit={hub.bind('STOP_EDITING_TODO', todo)}
        />
        <button onClick={hub.bind('CANCEL_EDITING_TODO', todo)}>cancel</button>
      </div>
    )
  },

  renderForViewing: function() {

    var hub = this.props.hub
    var todo = this.props.todo
    var htmlId = 'todo-' + todo.id

    return (
      <div>
        <p>
          <input 
            id={htmlId}
            type="checkbox" 
            checked={todo.done} 
            onChange={hub.bind('PATCH_TODO', todo, { done: !todo.done })}
          />
          <label htmlFor={htmlId}>{ this.props.todo.text }</label>
        </p>
        <button onClick={hub.bind('START_EDITING_TODO', todo)}>Edit</button>
        <button onClick={hub.bind('DELETE_TODO', todo)}>Delete</button>
      </div>
    )
  },

  render: function() {
    return (
      <div className="item">
        { this.props.isEditing ? this.renderForEditing() : this.renderForViewing() }
      </div>
    )
  }
})

var StateHistory = React.createClass({ // stash

  render: function() {
    return (
      <div id="state-history">
        {
          stateHistory.map(function(item, i) {
            return <div className="item" key={i}>
              <button onClick={this.props.onRecreate.bind(null, item)}>recreate</button>
              {JSON.stringify(item)}
            </div>
          }, this)
        }
      </div>
    )
  }
})

React.render(<TodoApp />, document.getElementById('todos'))
