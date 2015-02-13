/* */ 
var _isArray = require("./internal/_isArray");
module.exports = function fromPairs(pairs) {
  var idx = -1,
      len = pairs.length,
      out = {};
  while (++idx < len) {
    if (_isArray(pairs[idx]) && pairs[idx].length) {
      out[pairs[idx][0]] = pairs[idx][1];
    }
  }
  return out;
};
