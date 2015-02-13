/* */ 
"format cjs";
(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(["ramda"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require("../../dist/ramda"));
  } else {
    this.lazylist = factory(this.R);
  }
}(function(R) {
  var lazylist = (function() {
    var create = (function() {
      var F = function() {};
      return function(src) {
        F.prototype = src;
        return new F();
      };
    }());
    var trampoline = function(fn) {
      var result = fn.apply(this, R.tail(arguments));
      while (typeof result === 'function') {
        result = result();
      }
      return result;
    };
    var LZ = function(seed, current, step) {
      this['0'] = current(seed);
      this.tail = function() {
        return new LZ(step(seed), current, step);
      };
    };
    LZ.prototype = {
      constructor: LZ,
      length: Infinity,
      take: function(n) {
        var take = function(ctr, lz, ret) {
          return (ctr === 0) ? ret : take(ctr - 1, lz.tail(), ret.concat([lz[0]]));
        };
        return trampoline(take, n, this, []);
      },
      takeWhile: function(pred) {
        var results = [],
            current = this;
        while (pred(current[0])) {
          results.push(current[0]);
          current = current.tail();
        }
        return results;
      },
      drop: function(n) {
        var skip = function(ctr, lz) {
          return (ctr <= 0) ? lz : skip(ctr - 1, lz.tail());
        };
        return trampoline(skip, n, this);
      },
      map: function(fn) {
        var ls = this;
        var lz = create(LZ.prototype);
        lz[0] = fn(ls[0]);
        lz.tail = function() {
          return ls.tail().map(fn);
        };
        return lz;
      },
      filter: function(fn) {
        var ls = this,
            head = ls[0];
        while (!fn(head)) {
          ls = ls.tail();
          head = ls[0];
        }
        var lz = create(LZ.prototype);
        lz[0] = head;
        lz.tail = function() {
          return R.filter(fn, ls.tail());
        };
        return lz;
      }
    };
    return function(seed, current, step) {
      return new LZ(seed, current, step);
    };
  }());
  R.lazylist = lazylist;
  R.lazylist.repeat = function(value) {
    var fn = R.always(value);
    return lazylist(null, fn, fn);
  };
  return lazylist;
}));
