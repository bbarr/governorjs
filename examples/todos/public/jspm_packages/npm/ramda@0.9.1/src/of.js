/* */ 
var _hasMethod = require("./internal/_hasMethod");
module.exports = function of(x, container) {
  return (_hasMethod('of', container)) ? container.of(x) : [x];
};
