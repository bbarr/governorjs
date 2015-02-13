/* */ 
var _noArgsException = require("./_noArgsException");
module.exports = function _createMaxMin(comparator, initialVal) {
  return function(list) {
    if (arguments.length === 0) {
      throw _noArgsException();
    }
    var idx = -1,
        winner = initialVal,
        computed;
    while (++idx < list.length) {
      computed = +list[idx];
      if (comparator(computed, winner)) {
        winner = computed;
      }
    }
    return winner;
  };
};
