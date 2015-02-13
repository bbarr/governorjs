/* */ 
var _concat = require("./internal/_concat");
var _hasMethod = require("./internal/_hasMethod");
var _isArray = require("./internal/_isArray");
var op = require("./op");
module.exports = op(function(set1, set2) {
  if (_isArray(set2)) {
    return _concat(set1, set2);
  } else if (_hasMethod('concat', set1)) {
    return set1.concat(set2);
  } else {
    throw new TypeError("can't concat " + typeof set1);
  }
});
