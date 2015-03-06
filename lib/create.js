
var R = require('ramda')
var React = require('react/addons')
var hub = require('./hub')

module.exports = function(links, output) {

  var nestedPath = function(delta, path) {
    return path ? R.assocPath(path, delta, {}) : delta
  }

  var swap = (function() {
    var state = {}
    return function(path, delta) {
      return delta ? (state = React.addons.update(state, nestedPath(delta, path))) : (path ? R.path(path, state) : state)
    }
  })()

  var render = R.ifElse(function() { return stores }, R.compose(R.partialRight(output, hub), swap), swap)
  
  var stores = R.toPairs(links).map(function(link) {
    var path = link[0], Store = link[1]
    return Store({
      set: render.bind(this, path),
      get: swap.bind(this, path)
    }, hub)
  }, this)

  // initial render
  render()

  return { hub: hub }
}
