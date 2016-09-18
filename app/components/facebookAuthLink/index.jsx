import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores'
import FacebookAuthActions from 'actions/facebookAuth'
import FacebookAuthStore from 'stores/facebookAuth'
import session from 'services/session'
import config from 'config'

@connectToStores
export default class FacebookAuthLink extends React.Component {
  static getStores(props) {
    return [FacebookAuthStore];
  }

  static getPropsFromStores(props) {
    return FacebookAuthStore.getState();
  }

  componentDidMount() {
    FB.init({
      appId: config.facebookCliendId,
      cookie: true,
      version: 'v2.5'
    });
  }

  handleClick = (event) => {
    event.preventDefault();

    if (this.props.connected) {
      FacebookAuthActions.delete();
    } else if (session.loggedIn()) {
      FacebookAuthActions.connect();
    } else {
      FacebookAuthActions.create();
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
