
var R = require('ramda')
var React = require('react/addons')
var createHub = require('./hub')
var util = require('./store_fns')

var RootMixin = function(pairs) {

  var hub = createHub()

  return {

    // custom props
    stores: [],

    // react props
    getDefaultProps: function() {
      return { hub: hub }
    },

    getInitialState: function() { return {} },

    componentWillMount: function() {
      this.stores = pairs.map(util.createStore.bind(null, this, hub))
    },

    componentWillUnmount: function() {
      this.stores.forEach(util.unmount.bind(null, hub))
    },

    componentWillUpdate: function(newProps, newState) {
      var oldState = this.state
      this.stores.forEach(function(store) {
        if (store.depPaths) {
          Object.keys(store.depPaths).forEach(function(key) {
            var path = store.depPaths[key]
            var newData = util.getStateAt(path, { state: newState })
            if (util.getStateAt(path, { state: oldState }) !== newData) {
              var fn = store.dependencies[key]
              if (typeof fn === 'function') {
                store.dependencies[key](newData)
              } else {
                store[fn](newData)
              }
            }
          })
        }
      })
    }
  }
}

module.exports = RootMixin
