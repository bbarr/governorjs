/* */ 
var _curry2 = require("./internal/_curry2");
var _foldl = require("./internal/_foldl");
var keys = require("./keys");
module.exports = _curry2(function mapObjectIndexed(fn, obj) {
  return _foldl(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
