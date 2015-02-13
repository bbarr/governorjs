/* */ 
var _curry3 = require("./internal/_curry3");
var _extend = require("./internal/_extend");
var _map = require("./internal/_map");
var createMapEntry = require("./createMapEntry");
var fromPairs = require("./fromPairs");
var keysIn = require("./keysIn");
module.exports = _curry3(function(prop, val, obj) {
  return _extend(fromPairs(_map(function(key) {
    return [key, obj[key]];
  }, keysIn(obj))), createMapEntry(prop, val));
});
