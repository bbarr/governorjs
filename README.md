# governorjs
State manager courtesy of React.addons.update

## Example
```javascript
var React = require('react')
var governor = require('governor')
var hub = governor.hub

var messageStore = function(state) {
  state.set('some default text')
  hub.on('updateText', state.set)
}

var Message = React.createClass({
	render: function(props) {
		return (
			<div id="example">
				<MessageInput text={this.props.message} />
				{ this.props.message }
			</div>
		)
	}
})

var MessageInput = React.createClass({
  mixins: [ Governor.pureRenderMixin('text') ],
	render: function() {
		return <input type="text" value={this.props.message} onChange={R.compose(hub.bind('updateText'), R.path([ 'target', 'value' ]))} />
	}
})

governor({
  // binds messageStore to 'message' property of state given to below callback
  message: messageStore
}, function(state) {
  // state is the current state (initially an object with whatever changes the above stores make)
  React.render(<Message {...state} />, document.getElementById('message'))
})
```

##API

###create :: (Object) -> Object
```javascript
var stateManager = Governor.create({
  foo: fooStore,
  bar: barStore
}, function(state) {
  // state.foo is fooStore's state
  // state.bar is barStore's state
  // do things with current state, like render a React component
})
```

###pureRenderMixin :: (str str ...etc) -> react-mixin-object
```javascript
var mixin = Governor.pureRenderMixin('foo', 'zap')
```
The above mixin, when mixed into a component, would cause it to only rerender if its incoming "foo" or "zap" property was changed from the last render (using ```===```).

###Store interface
A store is just a function.

This function will receive 2 arguments, the first, an object containing ```get```, ```update```, ```set```, and ```merge``` methods, used to update the store's state.

```update``` uses React.addons.update, [documented here](http://facebook.github.io/react/docs/update.html). ```set``` and ```merge``` are shortcuts to those specific types of updates.
