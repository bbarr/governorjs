/* */ 
var _contains = require("./internal/_contains");
var _curry2 = require("./internal/_curry2");
var _pickBy = require("./internal/_pickBy");
module.exports = _curry2(function omit(names, obj) {
  return _pickBy(function(val, key) {
    return !_contains(key, names);
  }, obj);
});
