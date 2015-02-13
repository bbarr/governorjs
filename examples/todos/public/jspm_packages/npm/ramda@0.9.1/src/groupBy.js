/* */ 
var _append = require("./internal/_append");
var _curry2 = require("./internal/_curry2");
var _foldl = require("./internal/_foldl");
module.exports = _curry2(function groupBy(fn, list) {
  return _foldl(function(acc, elt) {
    var key = fn(elt);
    acc[key] = _append(elt, acc[key] || (acc[key] = []));
    return acc;
  }, {}, list);
});
