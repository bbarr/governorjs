
import R from 'ramda'

var createId = (function() {
  var id = 0
  return function() { return (id++).toString() }
})()

var TodoStore = function(state) {

  // set default
  state.set({ 
    $set: { 
      list: [],
      pending: '',
      editBuffer: {}
    }
  })

  return {

    // this object contains event names that 
    // will be bound to mixed-in component's event hub
    actions: {
      CREATE_TODO: 'create',
      DELETE_TODO: 'remove',
      PATCH_TODO: 'patch',
      START_EDITING_TODO: 'startEditing',
      CANCEL_EDITING_TODO: 'cancelEditing',
      STOP_EDITING_TODO: 'stopEditing',
      SET_PENDING: function(text) { state.set({ pending: { $set: text } }) }
    },

    create: function() {
      var todo = { id: createId(), text: state.get().pending, done: false }
      state.set({ 
        list: { $push: [ todo ] },
        pending: { $set: '' }
      })
    },

    remove: function(todo) {
      var index = state.get().list.indexOf(todo)
      state.set({ list: { $splice: [ [ index, 1 ] ] } })
    },

    patch: function(todo, updated) {
      var index = state.get().list.indexOf(todo)
      state.set({ 
        list: R.assoc(index, { '$merge': updated }, {})
      })
    },

    startEditing: function(todo) {
      state.set({
        editBuffer: R.assoc(todo.id, { $set: todo }, {})
      })
    },

    cancelEditing: function(todo) {
      var index = state.get().list.indexOf(todo)
      var old = state.get().editBuffer[todo.id]
      state.set({
        list: R.assoc(index, { '$set': old }, {}),
        editBuffer: { $apply: R.omit([todo.id]) }
      })
    },

    stopEditing: function(todo) {
      state.set({
        editBuffer: { $apply: R.omit([todo.id]) }
      })
    }
  }
}

export default TodoStore
