
import R from 'ramda'
import React from 'react'
import Governor from 'governor'

import TodoStore from './todo_store'

var stateHistory = []
var genId = (function() { var id = 0; return function() { return id++ } })()

var TodoApp = React.createClass({

  render: function() {

    stateHistory.unshift(R.omit([ 'hub' ], R.merge(this.props, { id: genId() })))

    var hub = this.props.hub
    var todos = this.props.todos

    var list = todos.list.map(function(todo) {
      return <Item key={todo.id} isEditing={todos.editBuffer[todo.id]} todo={todo} hub={hub} />
    })

    return (
      <div id="todo-app-component">
        <StateHistory onRecreate={R.unary(this.setProps.bind(this))} /> 
        <h3 onClick={hub.set.bind(hub, { foo: { $set: 'bar' } } )}>Todo Example { this.props.view.foo }</h3>
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

  mixins: [ Governor.pureRenderMixin('value'), Governor.highlightMixin ],

  render: function() {
    return (
      <form onSubmit={R.compose(this.props.onSubmit, R.invoker(0, 'preventDefault'))}>
        <input type="text" value={this.props.value} onChange={this.props.onChange} />
      </form>
    )
  }
})

var Item = React.createClass({

  mixins: [ Governor.pureRenderMixin('todo', 'isEditing'), Governor.highlightMixin ],

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

var StateHistory = React.createClass({

  render: function() {
    return (
      <div id="state-history">
        {
          stateHistory.map(function(item) {
            var json = JSON.stringify(item)
            return <div className="item" key={item.id}>
              <button onClick={this.props.onRecreate.bind(null, item)}>recreate</button>
              {json}
            </div>
          }, this)
        }
      </div>
    )
  }
})

Governor.create({
  todos: TodoStore
}, function(data, hub) {
  React.render(<TodoApp hub={hub} {...data} />, document.getElementById('todos'))
})
