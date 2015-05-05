
var R = require('ramda')
var React = require('react')
var hub = require('./hub')
var create = require('./create')
var pureRenderMixin = require('./pure_render_mixin')
var highlightMixin = require('./highlight_mixin')

create.hub = hub
create.pureRenderMixin = pureRenderMixin
create.highlightMixin = highlightMixin
create.component = function(render, config) {
	return React.createClass(R.merge({
    render: function() {
      return render(this.props, this)
    }
  }, config || {}))
}

module.exports = create
