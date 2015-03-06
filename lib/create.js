
var R = require('ramda')
var React = require('react/addons')

var hub = {

  _events: {},

  bind: function() {
    var args = [].slice.call(arguments)
    var _this = this
    return function() {
      _this.emit.apply(_this, args.concat([].slice.call(arguments)))
    }
  },
  on: function(key, fn) {
    if (!fn) return R.toPairs(key).forEach(R.apply(this.on));
    (hub._events[key] || (hub._events[key] = [])).push(fn)
  },
  off: function(key, fn) {
    var q = hub._events[key]
    if (!q) return

    if (fn) {
      var index = q.indexOf(fn)
      if (index === -1) return
      q.splice(index, 1)
      if (!q[0]) delete hub._events[key]
    } else {
      delete hub._events[key]
    }
  },
  emit: function() {
    var args = [].slice.call(arguments)
    var q = hub._events[args.shift()] || []
    q.forEach(function(fn) {
      fn.apply(null, args)
    })
  }
} 

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
