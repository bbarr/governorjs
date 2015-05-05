
import R from 'ramda'

var createId = (function() {
  var id = 0
  return function() { return (id++).toString() }
})()

var TodoStore = function(state, hub) {

  // set default
  state.set({ 
		list: [],
		pending: '',
		editBuffer: {}
  })

  var actions = {

    create: function() {
      var todo = { id: createId(), text: state.get().pending, done: false }
      state.update({ 
        list: { $push: [ todo ] },
        pending: { $set: '' }
      })
    },

    remove: function(todo) {
      var index = state.get().list.indexOf(todo)
      state.update({ list: { $splice: [ [ index, 1 ] ] } })
    },

    patch: function(todo, updated) {
      var index = state.get().list.indexOf(todo)
      state.update({ 
        list: R.assoc(index, { '$merge': updated }, {})
      })
    },

    startEditing: function(todo) {
      state.update({
        editBuffer: R.assoc(todo.id, { $set: todo }, {})
      })
    },

    cancelEditing: function(todo) {
      var index = state.get().list.indexOf(todo)
      var old = state.get().editBuffer[todo.id]
      state.update({
        list: R.assoc(index, { '$set': old }, {}),
        editBuffer: { $apply: R.omit([todo.id]) }
      })
    },

    stopEditing: function(todo) {
      state.update({
        editBuffer: { $apply: R.omit([todo.id]) }
      })
    }
  }

  hub.on({
    CREATE_TODO: actions.create,
    DELETE_TODO: actions.remove,
    PATCH_TODO: actions.patch,
    START_EDITING_TODO: actions.startEditing,
    CANCEL_EDITING_TODO: actions.cancelEditing,
    STOP_EDITING_TODO: actions.stopEditing,
    SET_PENDING: function(text) { state.update({ pending: { $set: text } }) }
  })
}

export default TodoStore
