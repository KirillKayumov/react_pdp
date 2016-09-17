import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'
import GoogleAuthActions from 'actions/googleAuth'
import GoogleAuthStore from 'stores/googleAuth'
import session from 'services/session'

@connectToStores
export default class GoogleAuthLink extends React.Component {
  static getStores(props) {
    return [GoogleAuthStore];
  }

  static getPropsFromStores(props) {
    return GoogleAuthStore.getState();
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.props.connected) {
      GoogleAuthActions.delete();
    } else if (session.loggedIn()) {
      GoogleAuthActions.connect();
    } else {
      GoogleAuthActions.create();
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
