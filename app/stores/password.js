import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import PasswordActions from 'actions/password';

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
