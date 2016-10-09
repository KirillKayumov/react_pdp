import React, { PropTypes } from 'react';
import GoogleAuthActions from 'actions/googleAuth';

export default class GoogleAuthLink extends React.Component {
  static propTypes = {
    connected: PropTypes.bool,
    userAuthenticated: PropTypes.bool
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.props.connected) {
      GoogleAuthActions.delete();
    } else if (this.props.userAuthenticated) {
      GoogleAuthActions.connect();
    } else {
      GoogleAuthActions.authenticate();
    }
  }

  className() {
    let name = "google_oauth2";

    if (this.props.connected) {
      name += " google_oauth2--connected";
    }

    return name;
  }

  render() {
    return (
      <a className={ this.className() } onClick={ this.handleClick }/>
    );
  }
}
