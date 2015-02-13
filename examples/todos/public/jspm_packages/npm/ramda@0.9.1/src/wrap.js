/* */ 
(function(process) {
  var _concat = require("./internal/_concat");
  var curryN = require("./curryN");
  module.exports = function wrap(fn, wrapper) {
    return curryN(fn.length, function() {
      return wrapper.apply(this, _concat([fn], arguments));
    });
  };
})(require("process"));
