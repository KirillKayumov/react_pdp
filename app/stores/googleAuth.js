import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SessionActions from 'actions/session';
import GoogleAuthActions from 'actions/googleAuth';
import SessionStore from 'stores/session';
import session from 'services/session';

@createStore(Alt)
export default class GoogleAuthStore {
  static displayName = 'GoogleAuthStore'

  constructor() {
    this.connected = '';
    // this.connected = this._isConnectedToUser();

    // this.bindListeners({
    //   unconnect: [SessionActions.DELETE, GoogleAuthActions.DELETE],
    //   handleSessionCreate: SessionActions.CREATE,
    //   handleGoogleAuthConnect: GoogleAuthActions.CONNECT
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

  handleGoogleAuthConnect(response) {
    this.connected = response.status == 201;
  }

  _isConnectedToUser() {
    if (session.loggedIn()) {
      let userProviders = session.currentUser().identities.map(indentity => indentity.provider);

      return userProviders.indexOf("google_oauth2") != -1;
    } else {
      return false;
    }
  }
}
