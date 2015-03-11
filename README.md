# governorjs
State manager courtesy of React.addons.update

## Example
```javascript
var React = require('react')
var Governor = require('governor')

var messageStore = function(state, hub) {

  function set(newText) { 
    state.set({ $set: newText }) 
  }

  set('some default text')

  hub.on('updateText', set)
}

var Message = React.createClass({

  render: function() {
    return (
      <div id="example">
        <MessageInput emit={this.props.emit} text={this.props.text} />
        { this.props.text }
      </div>
    )
  }
})

var MessageInput = React.createClass({

  // will only rerender if props.text is changed
  mixins: [ Governor.pureRenderMixin('text') ],

  update: function(e) {
    this.props.emit('updateText', e.target.value)
  },

  render: function() {
    <input type="text" value={this.props.text} onChange={this.update} />
  }
})

Governor.create({

  // binds messageStore's get/set to 'message' property of state given to below callback
  message: messageStore

}, function(state, hub) {

  // state is the current state (initially an object with whatever changes the above stores make
  // hub is simple pub/sub to trigger actions in stores
  React.render(<Message {...state} emit={hub.emit} />, document.getElementById('message'))
})
```

##API

###create :: (Object) -> Object
```javascript
var stateManager = Governor.create({
  foo: fooStore,
  bar: barStore
}, function(state, hub) {
  // state.foo is fooStore's state
  // state.bar is barStore's state
  // do things with current state and communication hub
})
```

###pureRenderMixin :: (str str ...etc) -> react-mixin-object
```javascript
var mixin = Governor.pureRenderMixin('foo', 'zap')
```
The above mixin, when mixed into a component, would cause it to only rerender if its incoming "foo" or "zap" property was changed from the last render (using ```===```).

###Store interface
A store is just a function.

This function will receive 2 arguments, the first, an object containing ```get``` and ```set``` methods, used to update the store's state, and the second, a reference to an event hub that it can listen to for relevant events.

  ```set``` uses React.addons.update, [documented here](http://facebook.github.io/react/docs/update.html).
