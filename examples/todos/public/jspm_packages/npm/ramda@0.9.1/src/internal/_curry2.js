/* */ 
var _noArgsException = require("./_noArgsException");
module.exports = function _curry2(fn) {
  return function(a, b) {
    switch (arguments.length) {
      case 0:
        throw _noArgsException();
      case 1:
        return function(b) {
          return fn(a, b);
        };
      default:
        return fn(a, b);
    }
  };
};
