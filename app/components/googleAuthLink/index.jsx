import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'
import GoogleAuthActions from 'actions/googleAuth'
import GoogleAuthStore from 'stores/googleAuth'
import session from 'services/session'

export default class GoogleAuthLink extends React.Component {
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
      <a className={ this.className() } onClick={ this.handleClick }></a>
    )
  }
}
