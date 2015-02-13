/* */ 
var _nth = require("./internal/_nth");
module.exports = function nthArg(n) {
  return function() {
    return _nth(n, arguments);
  };
};
