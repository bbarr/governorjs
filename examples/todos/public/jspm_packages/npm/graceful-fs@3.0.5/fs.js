/* */ 
(function(process) {
  var mod = require("../../../../web/governorjs/examples/todos/module");
  var pre = '(function (exports, require, module, __filename, __dirname) { ';
  var post = '});';
  var src = pre + process.binding('natives').fs + post;
  var vm = require("vm");
  var fn = vm.runInThisContext(src);
  fn(exports, require, module, __filename, __dirname);
})(require("process"));