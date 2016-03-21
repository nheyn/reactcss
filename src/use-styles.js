'use strict'

const React = require('react')

const inline = require('./inline')

/**
 * Create a higher order Component that adds .css method (see Component.js) as a prop.
 *
 * @param Component The component to add 'css(..,)' to
 *
 * @return          The component with 'css(...)' added
 */
module.exports = (Compoent) => {
  return React.createClass({
    displayName: `UseStyles_${Compoent.displayName}`,

    contextTypes: {
      mixins: React.PropTypes.object
    },

    css(classes, declaredClasses) {
      // Create inline function with dummy Component (that can return classes from a method)
      const currInline = inline.bind({
        props: this.props,
        context: this.context,
        classes() {
          return classes
        }
      })

      // Get styles
      return currInline(declaredClasses)
    },

    render() {
      //return <Compoent {...this.props} css={this.css} />
      // Not using ^ so babel-react doesn't need to be added

      return React.createElement(
        Compoent,
        Object.assign({}, this.props, { css: this.css })
      )
    }
  })
}