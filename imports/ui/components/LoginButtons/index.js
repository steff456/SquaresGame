import React from 'react';
import Blaze from 'meteor/gadicc:blaze-react-component';

export default class LoginButtons extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Blaze template="loginButtons" align={this.props.align} />
  }
}