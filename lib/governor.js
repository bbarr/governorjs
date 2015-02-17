
var R = require('ramda')
var React = require('react')

module.exports = function(hub, component, links, opts) {

  return {
    
    _stores: [],

    _swapStateAt: function(path, newData) {
      var updated = React.addons.update(component.state, R.assocPath(path, newData, {}))
      component.setState(updated)
    },

    _getStateAt: function(path) {
      return R.path(path, component.state)
    },

    bind: function() {
      this._stores = links.map(function(link) {

        var path = link[0]
        var Store = link[1]
        
        var store = Store({
          get: this._getStateAt.bind(this, path),
          set: this._swapStateAt.bind(this, path),
        }, hub)

        return store
      }, this)
    },

    unbind: function(link) {
      delete this._stores
      hub.destroy()
    }
  }
}
