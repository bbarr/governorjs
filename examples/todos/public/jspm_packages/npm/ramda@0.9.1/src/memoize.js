/* */ 
var _foldl = require("./internal/_foldl");
var _slice = require("./internal/_slice");
module.exports = function memoize(fn) {
  var cache = {};
  return function() {
    if (!arguments.length) {
      return;
    }
    var position = _foldl(function(cache, arg) {
      return cache[arg] || (cache[arg] = {});
    }, cache, _slice(arguments, 0, arguments.length - 1));
    var arg = arguments[arguments.length - 1];
    return (position[arg] || (position[arg] = fn.apply(this, arguments)));
  };
};
