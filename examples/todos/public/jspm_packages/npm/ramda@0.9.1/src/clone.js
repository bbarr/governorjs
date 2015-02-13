/* */ 
var _baseCopy = require("./internal/_baseCopy");
module.exports = function clone(value) {
  return _baseCopy(value, [], []);
};
