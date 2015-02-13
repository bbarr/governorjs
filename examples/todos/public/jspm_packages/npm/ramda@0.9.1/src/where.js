/* */ 
var _noArgsException = require("./internal/_noArgsException");
var _satisfiesSpec = require("./internal/_satisfiesSpec");
var groupBy = require("./groupBy");
var keys = require("./keys");
module.exports = function where(spec, testObj) {
  var parsedSpec = groupBy(function(key) {
    return typeof spec[key] === 'function' ? 'fn' : 'obj';
  }, keys(spec));
  switch (arguments.length) {
    case 0:
      throw _noArgsException();
    case 1:
      return function(testObj) {
        return _satisfiesSpec(spec, parsedSpec, testObj);
      };
  }
  return _satisfiesSpec(spec, parsedSpec, testObj);
};
