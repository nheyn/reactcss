'use strict'

const React = require('react')
const inline = require('./inline')

class ReactCSSComponent extends React.Component {

  css(obj) {
    if (!this.classes) {
      console.warn(`Define this.classes on \`${ this.constructor.name }\``)
    }
    const classes = typeof this.classes === 'function'? this.classes(): {}

    return inline(classes, this.props, this.context.mixins, obj)
  }

  styles() {
    return this.css()
  }

}

// For New Mixins
ReactCSSComponent.contextTypes = {
  mixins: React.PropTypes.object,
}

module.exports = ReactCSSComponent