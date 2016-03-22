'use strict';

var React = require('react');
var inline = require('./inline');

module.exports = {
  contextTypes: {
    mixins: React.PropTypes.object
  },
  css: function css(obj) {
    if (!this.classes) {
      console.warn('Define this.classes on `' + this.constructor.name + '`');
    }
    var classes = typeof this.classes === 'function' ? this.classes() : {};

    return inline(classes, this.props, this.context.mixins, obj);
  }
};