/* */ 
var constructN = require("./constructN");
module.exports = function construct(Fn) {
  return constructN(Fn.length, Fn);
};
