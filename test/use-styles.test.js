'use strict'

const React = require('react')
const TestUtils = require('react-addons-test-utils')
const expect = require('chai').expect
require('testdom')('<html><body></body></html>')

const useStyles = require('../src/use-styles');

describe('useStyles', function () {

  it('should return simple css', function () {

    class SomeComponent extends React.Component {

      styles() {
        return this.props.css(this.classes());
      }

      classes() {
        return {
          'default': {
            body: {
              background: '#fafafa',
            },
          },
        }
      }

      render() {
        return React.createElement('div')
      }
    }
    var StyledComponent = useStyles(SomeComponent);

    var styledComponent = TestUtils.renderIntoDocument(React.createElement(StyledComponent, {}, 'baz'))
    var someComponent = TestUtils.findRenderedComponentWithType(styledComponent, SomeComponent)

    expect(someComponent.styles()).to.eql({
      body: {
        background: '#fafafa',
      },
    })
  })

  it('should return complex css', function () {

    class SomeComponent extends React.Component {

      styles() {
        return this.props.css(this.classes());
      }

      classes() {
        return {
          'default': {
            title: {
              color: this.props.color,
            },
            card: {
              boxShadow: '0 0 2px rgba(0,0,0,.1)',
            },
          },
        }
      }

      render() {
        return React.createElement('div')
      }
    }
    var StyledComponent = useStyles(SomeComponent);

    var styledComponent = TestUtils.renderIntoDocument(React.createElement(StyledComponent, { color: 'red' }))
    var someComponent = TestUtils.findRenderedComponentWithType(styledComponent, SomeComponent)

    expect(someComponent.styles()).to.eql({
      card: {
        boxShadow: '0 0 2px rgba(0,0,0,.1)',
      },
      title: {
        color: 'red',
      },
    })
  })
})
