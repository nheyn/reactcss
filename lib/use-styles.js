'use strict';

var React = require('react');

var inline = require('./inline');

/*
  Create a higher order Component that adds .css method (see Component.js) as a prop.

  @param Component The component to add 'css(...)' to

  @return          The component with 'css(...)' added
 */
module.exports = function (Compoent) {
  return React.createClass({
    displayName: 'UseStyles_' + Compoent.displayName,

    contextTypes: {
      mixins: React.PropTypes.object
    },

    css: function css(classes, declaredClasses) {
      if (!classes) {
        console.warn('In `' + Compoent.displayName + '`, this.props.css must be passed classes');
      };

      return inline(classes, this.props, this.context.mixins, declaredClasses);
    },
    render: function render() {
      //return <Compoent {...this.props} css={this.css} />
      // Not using ^ so babel-react doesn't need to be added

      return React.createElement(Compoent, Object.assign({}, this.props, { css: this.css }));
    }
  });
};