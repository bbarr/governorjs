/* */ 
var _curry3 = require("./internal/_curry3");
module.exports = _curry3(function mapAccumR(fn, acc, list) {
  var idx = list.length,
      len = list.length,
      result = new Array(len),
      tuple = [acc];
  while (idx--) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
  }
  return [tuple[0], result];
});
