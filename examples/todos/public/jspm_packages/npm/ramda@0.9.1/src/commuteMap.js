/* */ 
var _ap = require("./internal/_ap");
var _curry3 = require("./internal/_curry3");
var _foldl = require("./internal/_foldl");
var _map = require("./internal/_map");
var append = require("./append");
module.exports = _curry3(function commuteMap(fn, of, list) {
  function consF(acc, ftor) {
    return _ap(_map(append, fn(ftor)), acc);
  }
  return _foldl(consF, of([]), list);
});
