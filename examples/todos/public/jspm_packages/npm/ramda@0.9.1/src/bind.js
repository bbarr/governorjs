/* */ 
var _curry2 = require("./internal/_curry2");
module.exports = _curry2(function bind(fn, thisObj) {
  return function() {
    return fn.apply(thisObj, arguments);
  };
});
