'use strict'

const React = require('react')

const inline = require('./inline')

/*
  Create a higher order Component that adds .css method (see Component.js) as a prop.

  @param Component The component to add 'css(...)' to

  @return          The component with 'css(...)' added
 */
module.exports = (Component) => {
  return React.createClass({
    displayName: `UseStyles_${Component.displayName}`,

    contextTypes: {
      mixins: React.PropTypes.object
    },

    css(classes, declaredClasses) {
      if(!classes) {
        console.warn(`In \`${ Component.displayName }\`, this.props.css must be passed classes`)
      };

      return inline(classes, this.props, this.context.mixins, declaredClasses)
    },

    render() {
      //return <Component {...this.props} css={this.css} />
      // Not using ^ so babel-react doesn't need to be added

      return React.createElement(
        Component,
        Object.assign({}, this.props, { css: this.css })
      )
    }
  })
}