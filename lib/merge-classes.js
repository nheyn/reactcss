'use strict';

var merge = require('merge');
var isObject = require('lodash.isobject');
var isArray = require('lodash.isarray');

module.exports = function (thingsToBeMerged) {

  // If its an object, lets just return it
  if (isObject(thingsToBeMerged) && !isArray(thingsToBeMerged)) {
    return thingsToBeMerged;
  }

  // If the array only has one object in it, return it
  if (thingsToBeMerged.length === 1) {
    return thingsToBeMerged[0];
  }

  // Else, lets just use the merge.js function:
  return merge.recursive.apply(undefined, thingsToBeMerged);
};