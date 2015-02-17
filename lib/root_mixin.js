
var R = require('ramda')
var React = require('react/addons')
var createHub = require('./hub')
var util = require('./store_fns')
var governor = require('./governor')

var RootMixin = function(links, opts) {

  opts || (opts = {})
  var hub = opts.hub || createHub()

  return {

    getDefaultProps: function() {
      return { hub: hub }
    },

    getInitialState: function() { 
      return {} 
    },

    componentWillMount: function() {
      this.governor = governor(hub, this, links, opts)
      this.governor.bind()
    },

    componentWillUnmount: function() {
      this.governor.unbind()
    }
  }
}

module.exports = RootMixin
