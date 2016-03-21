'use strict'

const React = require('react')
const inline = require('./inline')

module.exports = {
  contextTypes: {
    mixins: React.PropTypes.object
  },
  css(obj) {
    if (!this.classes) {
      console.warn(`Define this.classes on \`${ this.constructor.name }\``)
    }
    const classes = typeof this.classes === 'function'? this.classes(): {}

    return inline(classes, this.props, this.context.mixins, obj)
  }
}