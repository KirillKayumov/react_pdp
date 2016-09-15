import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import Storage from 'lib/storage';
import SessionActions from 'actions/session';
import SignupActions from 'actions/signup';
import config from 'config';
import GoogleAuthActions from 'actions/google_auth';
import ProfileActions from 'actions/profile';

const STORAGE_KEY = config.storageKey;

@createStore(Alt)
export default class SessionStore {
  static displayName = 'SessionStore'

  constructor() {
    this.currentUser = Storage.get(STORAGE_KEY) || {};

    this.bindListeners({
      create: [SessionActions.CREATE, GoogleAuthActions.CREATE, ProfileActions.UPDATE],
      delete: SessionActions.DELETE,
    });
  }

  create(response) {
    if (response.status == 201) {
      let user = response.json.user;

      this.currentUser = user;
      Storage.set(STORAGE_KEY, user);
    }
  }

  delete(response) {
    if (response.status == 200) {
      this.currentUser = {};
      Storage.remove(STORAGE_KEY);
    }
  }
}
