/* */ 
var _noArgsException = require("./internal/_noArgsException");
var _slice = require("./internal/_slice");
module.exports = function unapply(fn) {
  if (arguments.length === 0) {
    throw _noArgsException();
  }
  return function() {
    return fn(_slice(arguments));
  };
};
