/* */ 
var keys = require("./keys");
module.exports = function invertObj(obj) {
  var props = keys(obj),
      len = props.length,
      idx = -1,
      out = {};
  while (++idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
  }
  return out;
};
