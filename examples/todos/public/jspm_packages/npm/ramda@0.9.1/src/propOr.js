/* */ 
var _curry3 = require("./internal/_curry3");
var has = require("./has");
module.exports = _curry3(function propOr(val, p, obj) {
  return has(p, obj) ? obj[p] : val;
});
