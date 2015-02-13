/* */ 
var _curry2 = require("./internal/_curry2");
var _filter = require("./internal/_filter");
var not = require("./not");
module.exports = _curry2(function reject(fn, list) {
  return _filter(not(fn), list);
});
