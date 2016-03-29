'use strict'

const chai = require('chai')
const expect = chai.expect
const inline = require('../src/inline')

// chai.use(require('sinon-chai'))
// require('mocha-sinon')

describe('React Inline', () => {

  // beforeEach(() => {
  //   this.sinon.stub(console, 'warn')
  // })
  //
  // it('should throw error if no classes', function () {
  //   this.classes = false
  //   inline.call(this, { foo: true })
  //   expect(console.warn).to.have.been.called()
  // })

  it('return a css object from a set of true class names', function () {
    const classes = {
      'base': {
        card: {
          position: 'absolute',
        },
      },
    }

    const before = {
      foo: false,
      'base': true,
    }
    const after = {
      card: {
        position: 'absolute',
      },
    }

    expect(inline(classes, {}, null, before)).to.eql(after)
  })

  it('return a css object from a bunch of class names', function () {
    const classes = {
      'base': {
        card: {
          position: 'absolute',
        },
      },
      'outlined': {
        card: {
          border: '2px solid #aeee00',
        },
      },
      'disabled': {
        card: {
          display: 'none',
        },
      },
    }

    const before = {
      'base': true,
      'outlined': true,
      'disabled': false,
    }
    const after = {
      card: {
        position: 'absolute',
        border: '2px solid #aeee00',
      },
    }

    expect(inline(classes, {}, null, before)).to.eql(after)
  })

  it('include the `default` class', function () {
    const classes = {
      'default': {
        card: {
          position: 'absolute',
        },
      },
    }

    const after = {
      card: {
        position: 'absolute',
      },
    }

    expect(inline(classes)).to.eql(after)
  })

  it('include any true props that match class names', function () {
    const props = {
      isSelected: true,
      dark: true,
    }
    const classes = {
      'default': {
        card: {
          position: 'absolute',
        },
      },
      'isSelected': {
        card: {
          color: '#aeee00',
          border: '2px solid #aeee00',
        },
      },
      'dark-true': {
        card: {
          color: '#333',
        },
      },
    }

    const after = {
      card: {
        position: 'absolute',
        color: '#333',
        border: '2px solid #aeee00',
      },
    }

    expect(inline(classes, props, null, before)).to.eql(after)
  })

  it('check if props and values match a class', function () {
    const props = {
      isSelected: false,
      zDepth: 2,
    }
    const classes = {
      'default': {
        card: {
          position: 'absolute',
        },
      },
      'isSelected-false': {
        card: {
          background: 'grey',
        },
      },
      'zDepth-2': {
        card: {
          border: '2px solid #333',
        },
      },
    }

    const after = {
      card: {
        position: 'absolute',
        background: 'grey',
        border: '2px solid #333',
      },
    }

    expect(inline(classes, props, null, before)).to.eql(after)
  })
})
