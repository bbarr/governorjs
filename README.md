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

###childMixin :: (str str ...etc)
```
var mixin = Governor.childMixin('foo', 'zap')
```

The above mixin, when mixed into a component, would cause it to only rerender if its incoming "foo" or "zap" property was changed from the last render (using ```===```).
