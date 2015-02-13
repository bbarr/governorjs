/* */ 
var _isInteger = require("./internal/_isInteger");
var op = require("./op");
module.exports = op(function mathMod(m, p) {
  if (!_isInteger(m)) {
    return NaN;
  }
  if (!_isInteger(p) || p < 1) {
    return NaN;
  }
  return ((m % p) + p) % p;
});
