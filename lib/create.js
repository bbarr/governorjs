
var R = require('ramda')
var React = require('react/addons')
var createHub = require('./hub')

module.exports = function(links, output) {

  var hub = createHub()

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
      set: render.bind(null, path),
      get: swap.bind(null, path)
    }, hub)
  })

  // init shared view area
  hub.set = render.bind(this, 'view') 
  swap('view', { $set: {} })

  // initial render
  render()

  return { hub: hub }
}
