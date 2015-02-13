/* */ 
var keys = require("./keys");
module.exports = function values(obj) {
  var props = keys(obj);
  var len = props.length;
  var vals = new Array(len);
  var idx = -1;
  while (++idx < len) {
    vals[idx] = obj[props[idx]];
  }
  return vals;
};
