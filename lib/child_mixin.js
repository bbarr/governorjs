
var ChildMixin = function() {
  var args = [].slice.call(arguments)
  return {
    shouldComponentUpdate: function(newProps) {
      var currentProps = this.props
      return args.reduce(function(bool, arg) {
        return bool || currentProps[arg] !== newProps[arg]
      }, false)
    }
  }
}

module.exports = ChildMixin
