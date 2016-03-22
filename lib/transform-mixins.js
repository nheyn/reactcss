'use strict';

var isObject = require('lodash.isobject');
var isArray = require('lodash.isarray');
var merge = require('merge');

/*
  Custom Props for the _mixins function
  These custom props will eventually live in a file or config somewhere
*/

var localProps = {
  userSelect: function userSelect(value) {
    if (value !== null) {
      return {
        WebkitTouchCallout: value,
        KhtmlUserSelect: value,
        MozUserSelect: value,
        msUserSelect: value,
        WebkitUserSelect: value,
        userSelect: value
      };
    }
  },

  flex: function flex(value) {
    if (value !== null) {
      return {
        WebkitBoxFlex: value,
        MozBoxFlex: value,
        WebkitFlex: value,
        msFlex: value,
        flex: value
      };
    }
  },

  flexBasis: function flexBasis(value) {
    if (value !== null) {
      return {
        WebkitFlexBasis: value,
        flexBasis: value
      };
    }
  },

  justifyContent: function justifyContent(value) {
    if (value !== null) {
      return {
        WebkitJustifyContent: value,
        justifyContent: value
      };
    }
  },

  transition: function transition(value) {
    if (value !== null) {
      return {
        msTransition: value,
        MozTransition: value,
        OTransition: value,
        WebkitTransition: value,
        transition: value
      };
    }
  },

  transform: function transform(value) {
    if (value !== null) {
      return {
        msTransform: value,
        MozTransform: value,
        OTransform: value,
        WebkitTransform: value,
        transform: value
      };
    }
  },

  Absolute: function Absolute(value) {
    if (value !== null) {
      var direction = value.split(" ");
      return {
        position: 'absolute',
        top: direction[0],
        right: direction[1],
        bottom: direction[2],
        left: direction[3]
      };
    }
  },

  Extend: function Extend(name, otherElementStyles) {
    var otherStyle = otherElementStyles[name];
    if (otherStyle) {
      return otherStyle;
    }
  }

};

var transform = function transform(styleObject, customFuncs, parent) {

  var customProps = merge(customFuncs, localProps);
  var obj = {};

  for (var key in styleObject) {
    var value = styleObject[key];

    // If its an object
    if (isObject(value) && !isArray(value)) {
      // Lets go ahead and run again
      obj[key] = transform(value, customFuncs, styleObject);
    } else {
      // Check to see if a custom prop exists for it
      if (customProps[key]) {
        // let loop though and save the results from the function
        var customResults = customProps[key](value, parent);
        for (var customKey in customResults) {
          var customValue = customResults[customKey];
          obj[customKey] = customValue;
        }
      } else {
        // If not, just copy it as-is
        obj[key] = value;
      }
    }
  }

  return obj;
};

module.exports = function (styleObject, customFuncs, parent) {
  return transform(styleObject, customFuncs, parent);
};