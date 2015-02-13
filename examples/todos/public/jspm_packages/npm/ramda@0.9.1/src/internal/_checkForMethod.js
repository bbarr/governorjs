/* */ 
var _isArray = require("./_isArray");
module.exports = function _checkForMethod(methodname, fn) {
  return function(a, b, c) {
    var length = arguments.length;
    var obj = arguments[length - 1],
        callBound = obj && !_isArray(obj) && typeof obj[methodname] === 'function';
    switch (arguments.length) {
      case 0:
        return fn();
      case 1:
        return callBound ? obj[methodname]() : fn(a);
      case 2:
        return callBound ? obj[methodname](a) : fn(a, b);
      case 3:
        return callBound ? obj[methodname](a, b) : fn(a, b, c);
    }
  };
};
