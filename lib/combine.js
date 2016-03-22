'use strict';

var merge = require('./merge-classes');
var mixins = require('./transform-mixins');

module.exports = function (styles, customMixins) {
  var merged = merge(styles);
  return mixins(merged, customMixins);
};