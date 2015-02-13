/* */ 
var R = require("../../dist/ramda");
var setProp = R.curry(function(prop, value, obj) {
  obj[prop] = value;
  return obj;
});
void setProp;
