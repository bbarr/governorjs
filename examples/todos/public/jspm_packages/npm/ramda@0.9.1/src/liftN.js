/* */ 
var _ap = require("./internal/_ap");
var _curry2 = require("./internal/_curry2");
var _foldl = require("./internal/_foldl");
var _map = require("./internal/_map");
var _noArgsException = require("./internal/_noArgsException");
var _slice = require("./internal/_slice");
var curryN = require("./curryN");
module.exports = _curry2(function liftN(arity, fn) {
  var lifted = curryN(arity, fn);
  if (arguments.length === 0) {
    throw _noArgsException();
  }
  return curryN(arity, function() {
    return _foldl(_ap, _map(lifted, arguments[0]), _slice(arguments, 1));
  });
});
