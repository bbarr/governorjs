/* */ 
var _curry2 = require("./internal/_curry2");
var clone = require("./clone");
module.exports = _curry2(function sortBy(fn, list) {
  return clone(list).sort(function(a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});
