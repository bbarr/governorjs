/* */ 
var _noArgsException = require("./internal/_noArgsException");
var _slice = require("./internal/_slice");
module.exports = function func(funcName, obj) {
  switch (arguments.length) {
    case 0:
      throw _noArgsException();
    case 1:
      return function(obj) {
        return obj[funcName].apply(obj, _slice(arguments, 1));
      };
    default:
      return obj[funcName].apply(obj, _slice(arguments, 2));
  }
};
