
module.exports = function() {

  var events = {}

  return {
    bind: function() {
      var args = [].slice.call(arguments)
      var _this = this
      return function() {
        _this.emit.apply(_this, args.concat([].slice.call(arguments)))
      }
    },
    on: function(key, fn) {
      (events[key] || (events[key] = [])).push(fn)
    },
    off: function(key, fn) {
      var q = events[key]
      if (!q) return

      if (fn) {
        var index = q.indexOf(fn)
        if (index === -1) return
        q.splice(index, 1)
        if (!q[0]) delete events[key]
      } else {
        delete events[key]
      }
    },
    emit: function() {
      var args = [].slice.call(arguments)
      var q = events[args.shift()] || []
      q.forEach(function(fn) {
        fn.apply(null, args)
      })
    }
  }
}