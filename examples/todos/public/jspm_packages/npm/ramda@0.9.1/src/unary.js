/* */ 
var nAry = require("./nAry");
module.exports = function unary(fn) {
  return nAry(1, fn);
};
