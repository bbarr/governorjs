/* */ 
var _curry3 = require("./internal/_curry3");
module.exports = _curry3(function mapAccumL(fn, acc, list) {
  var idx = -1,
      len = list.length,
      result = new Array(len),
      tuple = [acc];
  while (++idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
  }
  return [tuple[0], result];
});
