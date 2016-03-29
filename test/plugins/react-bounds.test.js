'use strict'

const expect = require('chai').expect
const inline = require('../../src/inline')

describe('Plugins', () => {

  describe('React Bounds', () => {

    it('Activates class names if active bound name matches', function () {
      const props = {
        activeBounds: ['some-bound', 'really-large'],
      }

      const classes = {
        'default': {
          wrap: {
            position: 'relative',
          },
        },
        'some-bound': {
          wrap: {
            color: '#333',
          },
        },
        'really-large': {
          wrap: {
            fontSize: '24px',
          },
        },
      }

      const after = {
        wrap: {
          position: 'relative',
          color: '#333',
          fontSize: '24px',
        },
      }

      expect(inline(classes, props)).to.eql(after)
    })
  })
})
