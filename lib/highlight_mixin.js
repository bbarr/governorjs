
module.exports = {

  highlightTimer: null,

  componentDidUpdate: function() {

    var el = this.getDOMNode()

    if (this.highlightTimer) return
    el.classList.add('highlight')

    this.highlightTimer = setTimeout(function() { 
      clearTimeout(this.highlightTimer)
      this.highlightTimer = null
      el.classList.remove('highlight') 
    }, 100)
  }
}

