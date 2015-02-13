/* */ 
var _noArgsException = require("./_noArgsException");
module.exports = function _slice(args, from, to) {
  switch (arguments.length) {
    case 0:
      throw _noArgsException();
    case 1:
      return _slice(args, 0, args.length);
    case 2:
      return _slice(args, from, args.length);
    default:
      var length = Math.max(0, to - from),
          list = new Array(length),
          idx = -1;
      while (++idx < length) {
        list[idx] = args[from + idx];
      }
      return list;
  }
};
