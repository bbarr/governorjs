/* */ 
var _noArgsException = require("./internal/_noArgsException");
module.exports = function prop(p, obj) {
  switch (arguments.length) {
    case 0:
      throw _noArgsException();
    case 1:
      return function _prop(obj) {
        return obj[p];
      };
  }
  return obj[p];
};
