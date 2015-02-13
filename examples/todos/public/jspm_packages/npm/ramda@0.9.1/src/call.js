/* */ 
var _slice = require("./internal/_slice");
module.exports = function call(fn) {
  return fn.apply(this, _slice(arguments, 1));
};
