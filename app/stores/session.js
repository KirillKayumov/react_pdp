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
      create: [SessionActions.CREATE, SignupActions.CREATE, GoogleAuthActions.CREATE, ProfileActions.UPDATE],
      delete: SessionActions.DELETE,
    });
  }

  create(data) {
    if (data['user']) {
      this.currentUser = data['user'];
      Storage.set(STORAGE_KEY, data['user']);
    }
  }

  delete() {
    this.currentUser = {};
  }
}
