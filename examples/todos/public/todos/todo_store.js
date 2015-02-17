
import R from 'ramda'
import kefir from 'kefir'

var createId = (function() {
  var id = 0
  return function() { return (id++).toString() }
})()

var TodoStore = function(state, hub) {

  var actions = {

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

  // set default
  state.set({ 
    $set: { 
      list: [],
      pending: '',
      editBuffer: {}
    }
  })

  hub.on('CREATE_TODO', actions.create)
  hub.on('DELETE_TODO', actions.remove)
  hub.on('PATCH_TODO', actions.patch)
  hub.on('START_EDITING_TODO', actions.startEditing)
  hub.on('CANCEL_EDITING_TODO', actions.cancelEditing)
  hub.on('SET_PENDING', function(text) { state.set({ pending: { $set: text } }) })

  var createStream = kefir.fromEvent(hub, 'START_EDITING_TODO')
  var patchStream = kefir.fromEvent(hub, 'CANCEL_EDITING_TODO')
  createStream.combine(patchStream).log()

}

export default TodoStore
