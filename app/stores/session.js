import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import Storage from 'lib/storage';
import SessionActions from 'actions/session';
import SignupActions from 'actions/signup';
import config from 'config';
import ProfileActions from 'actions/profile';
import GoogleAuthActions from 'actions/googleAuth';

const STORAGE_KEY = config.storageKey;

@createStore(Alt)
export default class SessionStore {
  static displayName = 'SessionStore'

  constructor() {
    this.currentUser = Storage.get(STORAGE_KEY) || {};

    this.bindListeners({
      create: [SessionActions.CREATE, GoogleAuthActions.CONNECT, ProfileActions.UPDATE, GoogleAuthActions.DELETE],
      delete: SessionActions.DELETE
    });
  }

  create(response) {
    if (response.status == 200 || response.status == 201) {
      this._saveUser(response.json.user);
    }
  }

  delete(response) {
    if (response.status == 200) {
      this.currentUser = {};
      Storage.remove(STORAGE_KEY);
    }
  }

  _saveUser(user) {
    this.currentUser = Object.assign(this.currentUser, user);
    Storage.set(STORAGE_KEY, Object.assign(Storage.get(STORAGE_KEY) || {}, user));
  }
}
