/* */ 
var pCompose = require("./pCompose");
var reverse = require("./reverse");
module.exports = function pPipe() {
  return pCompose.apply(this, reverse(arguments));
};
