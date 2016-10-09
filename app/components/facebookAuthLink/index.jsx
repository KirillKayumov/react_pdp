import React, { PropTypes } from 'react';
import FacebookAuthActions from 'actions/facebookAuth';

export default class FacebookAuthLink extends React.Component {
  static propTypes = {
    connected: PropTypes.bool,
    userAuthenticated: PropTypes.bool
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.props.connected) {
      FacebookAuthActions.delete();
    } else if (this.props.userAuthenticated) {
      FacebookAuthActions.connect();
    } else {
      FacebookAuthActions.authenticate();
    }
  }

  className() {
    let name = "facebook";

    if (this.props.connected) {
      name += " facebook--connected";
    }

    return name;
  }

  render() {
    return (
      <a className={ this.className() } onClick={ this.handleClick }/>
    );
  }
}
