# governorjs
State/Store bindings for React.

## Example
```
var React = require('react')
var Governor = require('governorjs')

var MessageStore = function(state) {

  function set(newText) { 
    state.set({ $set: newText }) 
  }

  set('some default text')

  return {
    actions: {
      UPDATE_TEXT: set
    }
  }
}

var Message = React.createClass({

  mixins: [ Governor.rootMixin([ [ 'text', MessageStore ] ]) ],

  render: function() {
    return (
      <div id="example">
        <MessageInput hub={this.props.hub} text={this.state.text} />
        { this.state.text }
      </div>
    )
  }
})

var MessageInput = React.createClass({

  mixins: [ Governor.childMixin('text') ],

  update: function(e) {
    this.props.hub.emit('UPDATE_TEXT', e.target.value)
  },

  render: function() {
    <input type="text" value={this.props.text} onChange={this.update} />
  }
})
```

##API

###rootMixin :: (array) -> react-mixin-object
```
var mixin = Governor.rootMixin([
  [ 'foo', fooStore ],
  [ 'bar', barStore ]
])
```

The above mixin, when mixed into a component, would bind ```this.state.foo``` to ```fooStore```.

###childMixin :: (str str ...etc) -> react-mixin-object
```
var mixin = Governor.childMixin('foo', 'zap')
```
The above mixin, when mixed into a component, would cause it to only rerender if its incoming "foo" or "zap" property was changed from the last render (using ```===```).

###Store interface
The concept of a "store", according to ```rootMixin```, is just a function that is called when the target component is mounted.

This function must return an object, probably with an ```actions``` property containing keys of event names, and values of either strings that represent method names, or simply anonymous functions.

This function will also receive 2 arguments, the first, an object containing ```get``` and ```set``` methods, used to update the store's state, and the second, a reference to the event hub that is being used by the target component (and all of its other stores and children components).

```set``` uses React.addons.update, [documented here](http://facebook.github.io/react/docs/update.html).

###State dependencies
Sometimes a store will need to know about some other bit of state outside its domain. Since we want our state to be normalized, rather than introduce duplication or rely on events to synchronize
our state, we can handle it like this:

```
var storeA = function(state) {
  return {
    actions: { ... },
    dependencies: {
      bar: function(bar) { ... }
    }
  }
}

var storeB = function(state) {
  state.set({ someBar: { $set: 5 } })
  return { ... }
}

var mixin = Governor.rootMixin([
  [ 'a', storeA, { bar: 'b.someBar' } ],
  [ 'b', storeB ]
])

var App = React.createClass({
  mixins: [ mixin ]
  ...
})
```

Now whenever storeB changes ```someBar``` on its state, ```storeA```'s callback will be fired with the new value.
