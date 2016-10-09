import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'
import FacebookAuthActions from 'actions/facebookAuth'
import FacebookAuthStore from 'stores/facebookAuth'
import session from 'services/session'
import config from 'config'

export default class FacebookAuthLink extends React.Component {
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
      <a className={ this.className() } onClick={ this.handleClick }></a>
    )
  }
}
