
var R = require('ramda')

module.exports = (function() {

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

    once: function(key, fn) {
      var wrapped = function() {
        fn.apply(null, arguments)
        hub.off(key, wrapped)
      } 
      hub.on(key, wrapped)
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

  return hub
})() 
