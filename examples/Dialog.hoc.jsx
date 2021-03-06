'use strict';

const React = require('react');
const ReactCSS = require('reactcss');

const Button = require('./Button.hoc');

class Dialog extends React.Component {

  // Add this method to connect to RectCSS styles
  styles() {
    return this.props.css(this.classes());
  }

  classes() {
    return {
      // This is our default dialog class
      'default': {
        dialog: {
          background: '#fff',
          boxShadow: '0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)',
          borderRadius: '2px',
          maxWidth: '400px',
        },
        body: {
          padding: '24px',
        },
        title: {
          fontSize: '20px',
          fontWeight: '500',
          paddingBottom: '20px',
          color: 'rgba(0,0,0,.87)',
        },
        desc: {
          fontSize: '17px',
          lineHeight: '22px',
          color: 'rgba(0,0,0,.47)',
          margin: '0',
        },
        actions: {
          margin: '0',
          padding: '8px',
          display: 'flex',
          justifyContent: 'flex-end',
          listStyleType: 'none',
        },
        button: {
          marginLeft: '8px',
        },
        CancelButton: {
          background: 'red',
        },
      },

      // This class activates when `disabled: true` is passed as props
      'disabled-true': {
        AgreeButton: {
          disabled: true,
        },
      },
    };
  }

  render() {
    return (

      // You will notice the is syntax here, via `react-map-styles` package
      // This handles mapping the styles to the elements
      <div is="dialog">
        <div is="body">
          <div is="title">{ this.props.title }</div>
          <p is="desc">{ this.props.description }</p>
        </div>
        <ul is="actions">
          <li is="button"><Button is="CancelButton" label="Cancel" /></li>
          <li is="button"><Button is="AgreeButton" label="Yes, I Agree" /></li>
        </ul>
      </div>
    );
  }
}

// Create higher-order component to add 'getStyle' to props
export default ReactCSS.useStyles(Dialog);