/* */ 
var keys = require("./keys");
module.exports = function invert(obj) {
  var props = keys(obj),
      len = props.length,
      idx = -1,
      out = {};
  while (++idx < len) {
    var key = props[idx],
        val = obj[key];
    out[val] = out[val] || [];
    out[val].push(key);
  }
  return out;
};
