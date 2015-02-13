/* */ 
var _contains = require("./internal/_contains");
module.exports = function uniq(list) {
  var idx = -1,
      len = list.length;
  var result = [],
      item;
  while (++idx < len) {
    item = list[idx];
    if (!_contains(item, result)) {
      result[result.length] = item;
    }
  }
  return result;
};
