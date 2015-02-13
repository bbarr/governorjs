/* */ 
var _curry2 = require("./internal/_curry2");
var _noArgsException = require("./internal/_noArgsException");
var _slice = require("./internal/_slice");
var assoc = require("./assoc");
var is = require("./is");
var split = require("./split");
module.exports = (function() {
  var setParts = function(parts, val, obj) {
    if (parts.length === 1) {
      return assoc(parts[0], val, obj);
    }
    var current = obj[parts[0]];
    return assoc(parts[0], setParts(_slice(parts, 1), val, is(Object, current) ? current : {}), obj);
  };
  return function(path, val, obj) {
    var length = arguments.length;
    if (length === 0) {
      throw _noArgsException();
    }
    var parts = split('.', path);
    var fn = _curry2(function(val, obj) {
      return setParts(parts, val, obj);
    });
    switch (length) {
      case 1:
        return fn;
      case 2:
        return fn(val);
      default:
        return fn(val, obj);
    }
  };
}());
