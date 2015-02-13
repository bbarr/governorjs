/* */ 
var _multiply = require("./internal/_multiply");
var foldl = require("./foldl");
module.exports = foldl(_multiply, 1);
