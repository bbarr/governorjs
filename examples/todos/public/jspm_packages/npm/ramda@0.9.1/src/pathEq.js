/* */ 
var _curry3 = require("./internal/_curry3");
var _path = require("./internal/_path");
module.exports = _curry3(function(path, val, obj) {
  return _path(path.split('.'), obj) === val;
});
