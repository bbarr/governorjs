/* */ 
var _hasMethod = require("./internal/_hasMethod");
module.exports = function empty(x) {
  return (_hasMethod('empty', x)) ? x.empty() : [];
};
