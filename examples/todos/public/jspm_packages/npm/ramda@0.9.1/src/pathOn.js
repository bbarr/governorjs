/* */ 
var _curry3 = require("./internal/_curry3");
var _path = require("./internal/_path");
module.exports = _curry3(function pathOn(sep, str, obj) {
  return _path(str.split(sep), obj);
});
