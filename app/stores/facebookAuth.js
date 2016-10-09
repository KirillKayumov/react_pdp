import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SessionActions from 'actions/session';
import FacebookAuthActions from 'actions/facebookAuth';
import SessionStore from 'stores/session';
import session from 'services/session';

@createStore(Alt)
export default class FacebookAuthStore {
  static displayName = 'FacebookAuthStore'

  constructor() {
    // this.connected = this._isConnectedToUser();

    // this.bindListeners({
    //   unconnect: [SessionActions.DELETE, FacebookAuthActions.DELETE],
    //   handleSessionCreate: SessionActions.CREATE,
    //   handleFacebookAuthConnect: FacebookAuthActions.CONNECT
    // });
  }

  unconnect(response) {
    if (response.status == 200) {
      this.connected = false;
    }
  }

  handleSessionCreate(response) {
    this.waitFor(SessionStore);

    if (response.status == 201) {
      this.connected = this._isConnectedToUser();
    }
  }

  handleFacebookAuthConnect(response) {
    this.connected = response.status == 201;
  }

  _isConnectedToUser() {
    if (session.loggedIn()) {
      let userProviders = session.currentUser().identities.map(indentity => indentity.provider);

      return userProviders.indexOf("facebook") != -1;
    } else {
      return false;
    }
  }
}
