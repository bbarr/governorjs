/* */ 
var _curry2 = require("./_curry2");
var _noArgsException = require("./_noArgsException");
module.exports = function _curry3(fn) {
  return function(a, b, c) {
    switch (arguments.length) {
      case 0:
        throw _noArgsException();
      case 1:
        return _curry2(function(b, c) {
          return fn(a, b, c);
        });
      case 2:
        return function(c) {
          return fn(a, b, c);
        };
      default:
        return fn(a, b, c);
    }
  };
};
