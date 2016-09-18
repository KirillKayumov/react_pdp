import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import GoogleAuthActions from 'actions/googleAuth';
import PasswordActions from 'actions/password';
import FacebookAuthActions from 'actions/facebookAuth';

@createStore(Alt)
export default class PasswordStore {
  static displayName = 'PasswordStore';

  constructor() {
    this.name = '';
    this.password = '';

    this.bindListeners({
      setPassword: PasswordActions.SET_PASSWORD,
      reset: PasswordActions.SUBMIT,
      setName: [GoogleAuthActions.CREATE, FacebookAuthActions.CREATE]
    });
  }

  create(data) {
    this.email = data.json['user']['email'];
  }

  setPassword(password) {
    this.password = password;
  }

  reset() {
    this.name = '';
    this.password = '';
  }

  setName(response) {
    this.name = response.json.user.first_name;
  }
}
