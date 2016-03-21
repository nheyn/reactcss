'use strict';

const React = require('react');
const ReactCSS = require('reactcss');

class Button extends ReactCSS.Component {

  constructor() {
    super();

    // Set a fallback backgound and color if one isnt specified
    this.defaultProps = {
      background: '#4A90E2',
      color: 'rgba(255,255,255,.87)',
    };
  }

  // Add this method to connect to RectCSS styles
  styles() {
    return this.props.css(this.classes());
  }

  classes() {
    return {
      // This is our default button class
      'default': {
        button: {
          background: this.props.background,
          display: 'inline-block',
          height: '44px',
          lineHeight: '44px',
          borderRadius: '2px',
        },
        span: {
          color: this.props.color,
          padding: '0 14px',
        },
      },

      // This class activates when `disabled: true` is passed as props
      'disabled-true': {
        button: {
          background: '#ccc',
        },
        span: {
          color: '#aaa',
        },
      },
    };
  }

  render() {
    return (

      // You will notice the is syntax here, via `react-map-styles` package
      // This handles mapping the styles to the elements
      <div is="button">
        <span is="span">{ this.props.label }</span>
      </div>
    );
  }
}

export default ReactCSS.useStyles(Button);