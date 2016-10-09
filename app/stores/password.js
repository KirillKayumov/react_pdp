import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import GoogleAuthActions from 'actions/googleAuth';
import PasswordActions from 'actions/password';
import FacebookAuthActions from 'actions/facebookAuth';

@createStore(Alt)
export default class PasswordStore {
  static displayName = 'PasswordStore';

  constructor() {
    this.password = '';

    this.bindListeners({
      setPassword: PasswordActions.SET_PASSWORD,
      reset: PasswordActions.SUBMIT
    });
  }

  setPassword(password) {
    this.password = password;
  }

  reset() {
    this.password = '';
  }
}
