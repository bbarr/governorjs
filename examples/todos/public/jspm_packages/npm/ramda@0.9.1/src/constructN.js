/* */ 
var _curry2 = require("./internal/_curry2");
var curry = require("./curry");
var nAry = require("./nAry");
module.exports = _curry2(function constructN(n, Fn) {
  var f = function() {
    var Temp = function() {},
        inst,
        ret;
    Temp.prototype = Fn.prototype;
    inst = new Temp();
    ret = Fn.apply(inst, arguments);
    return Object(ret) === ret ? ret : inst;
  };
  return n > 1 ? curry(nAry(n, f)) : f;
});
