/* */ 
var is = require("./is");
module.exports = function length(list) {
  return list != null && is(Number, list.length) ? list.length : NaN;
};
