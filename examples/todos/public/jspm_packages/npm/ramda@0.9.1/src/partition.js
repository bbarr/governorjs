/* */ 
var _curry2 = require("./internal/_curry2");
var _foldl = require("./internal/_foldl");
module.exports = _curry2(function partition(pred, list) {
  return _foldl(function(acc, elt) {
    acc[pred(elt) ? 0 : 1].push(elt);
    return acc;
  }, [[], []], list);
});
