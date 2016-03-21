'use strict'

const isObject = require('lodash.isobject')
const checkClassStructure = require('./check-class-structure')
let combine = require('./combine')

/*
  Inline CSS function. This is the half-way point until multiple inheritance exists

  @param classes: The classes to use
  @param props: The props of the component the styles are being used by
  @param context: The context of the component the styles are being used by
  @param declaredClasses: Object{ 'class-name': true / false }

  @returns object
*/
module.exports = (classes, props, context, declaredClasses) => {
  // What?
  combine = require('./combine')

  const arrayOfStyles = []

  // Checks structure and warns if its odd
  checkClassStructure(classes)

  const activateClass = (name, options) => {
    if (classes[name]) {
      arrayOfStyles.push(classes[name])
    } else if (name && options && options.warn === true) {
      console.warn(`The \`${ name }\` css class does not exist on \`${ this.constructor.name }\``)
    }
  }

  activateClass('default')

  for(var prop in props) {
    let value = props[prop]
    if (!isObject(value)) {

      if (value === true) {
        activateClass(prop)
        activateClass(`${ prop }-true`)
      } else if (value) {
        activateClass(`${ prop }-${ value }`)
      } else {
        activateClass(`${ prop }-false`)
      }

    }
  }

  // React Bounds
  // http://casesandberg.github.io/react-bounds/
  // Activate classes that match active bounds
  if (props && props.activeBounds) {
    for (var i = 0; i < props.activeBounds.length; i++) {
      var boundName = props.activeBounds[i]
      activateClass(boundName)
    }
  }

  for (var name in declaredClasses) {
    let condition = declaredClasses[name]

    if (condition === true) {
      activateClass(name, { warn: true })
    }
  }

  let customMixins = {}
  if (context && context.mixins) {
    customMixins = context.mixins
  }

  return combine(arrayOfStyles, customMixins)
}