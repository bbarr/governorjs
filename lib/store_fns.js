
var R = require('ramda')
var React = require('react')

var storeFns = {

  parseFn: function(store, key, obj) {
    return typeof obj[key] === 'function' ? obj[key] : store[obj[key]]
  },
  
  mount: function(hub, store) {
    Object.keys(store.actions).forEach(function(key) {
      hub.on(key, storeFns.parseFn(store, key, store.actions))
    })
  },

  unmount: function(hub, store) {
    Object.keys(store.actions).forEach(function(key) {
      hub.off(key, storeFns.parseFn(store, key, store.actions))
    })
  },

  swapStateAt: function(root, path, newData) {
    var updated = React.addons.update(root.state, R.assocPath(path, newData, {}))
    root.setState(updated)
  },

  getStateAt: function(root, path) {
    return R.path(path, root.state)
  },

  createStore: function(root, hub, arr) {
    var path = arr[0]
    var Store = arr[1]
    var depPaths = arr[2]
    var store = Store({
      set: storeFns.swapStateAt.bind(null, root, path),
      get: storeFns.getStateAt.bind(null, root, path)
    }, hub)
    store.path = path
    store.depPaths = depPaths
    storeFns.mount(hub, store)
    return store
  }
}

module.exports = storeFns