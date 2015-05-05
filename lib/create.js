
var R = require('ramda')
var React = require('react/addons')
var hub = require('./hub')

module.exports = function(links, output) {

  var nestedPath = function(delta, path) {
    return path ? R.assocPath([].concat(path), delta, {}) : delta
  }

  var swap = (function() {
    var state = {}
    return function(path, delta) {
      return delta ? (state = React.addons.update(state, nestedPath(delta, path))) : (path ? R.path(path, state) : state)
    }
  })()

  var render = function(path, delta) {
		if (stores) {
			output(swap(path, delta))
		} else {
			swap(path, delta)
		}
	}

	var stateActions = function(path) {
		return {
			get: swap.bind(null, path),
			update: render.bind(null, path),
			set: function(delta) { render(path, { $set: delta }) },
			merge: function(delta) { render(path, { $merge: delta }) }
		}
	}
  
  var stores = R.toPairs(links).map(function(link) {
    var path = link[0], Store = link[1]
    return Store(stateActions(path), hub)
  })

  // initial render
  render()

  return { hub: hub }
}

