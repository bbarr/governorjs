/* */ 
var _concat = require("./internal/_concat");
var _noArgsException = require("./internal/_noArgsException");
var _slice = require("./internal/_slice");
module.exports = function flip(fn) {
  return function(a, b) {
    switch (arguments.length) {
      case 0:
        throw _noArgsException();
      case 1:
        return function(b) {
          return fn.apply(this, [b, a].concat(_slice(arguments, 1)));
        };
      default:
        return fn.apply(this, _concat([b, a], _slice(arguments, 2)));
    }
  };
};
