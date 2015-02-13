/* */ 
var _curry2 = require("./internal/_curry2");
module.exports = _curry2(function times(fn, n) {
  var list = new Array(Number(n));
  var len = list.length;
  var idx = -1;
  while (++idx < len) {
    list[idx] = fn(idx);
  }
  return list;
});
