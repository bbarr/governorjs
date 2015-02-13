/* */ 
var _noArgsException = require("./internal/_noArgsException");
var liftN = require("./liftN");
module.exports = function lift(fn) {
  if (arguments.length === 0) {
    throw _noArgsException();
  }
  return liftN(fn.length, fn);
};
