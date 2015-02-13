/* */ 
var _curry2 = require("./internal/_curry2");
module.exports = _curry2(function range(from, to) {
  if (from >= to) {
    return [];
  }
  var idx = 0,
      result = new Array(Math.floor(to) - Math.ceil(from));
  while (from < to) {
    result[idx++] = from++;
  }
  return result;
});
