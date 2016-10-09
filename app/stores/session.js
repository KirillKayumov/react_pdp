import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import Storage from 'lib/storage';
import SessionActions from 'actions/session';
import SignupActions from 'actions/signup';
import config from 'config';
import ProfileActions from 'actions/profile';
import GoogleAuthActions from 'actions/googleAuth';
import FacebookAuthActions from 'actions/facebookAuth';

const STORAGE_KEY = config.storageKey;

@createStore(Alt)
export default class SessionStore {
  static displayName = 'SessionStore'

  constructor() {
    this.currentUser = Storage.get(STORAGE_KEY) || {};

    this.bindListeners({
      create: SessionActions.CREATE,
      delete: SessionActions.DELETE
    })
  }

  create(user) {
    this.currentUser = user;
  }

  delete() {
    this.currentUser = {};
  }
}
