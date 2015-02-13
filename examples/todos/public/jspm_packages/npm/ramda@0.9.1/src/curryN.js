/* */ 
var _concat = require("./internal/_concat");
var _curry2 = require("./internal/_curry2");
var _noArgsException = require("./internal/_noArgsException");
var arity = require("./arity");
module.exports = _curry2(function curryN(length, fn) {
  return (function recurry(args) {
    return arity(Math.max(length - (args && args.length || 0), 0), function() {
      if (arguments.length === 0) {
        throw _noArgsException();
      }
      var newArgs = _concat(args, arguments);
      if (newArgs.length >= length) {
        return fn.apply(this, newArgs);
      } else {
        return recurry(newArgs);
      }
    });
  }([]));
});
