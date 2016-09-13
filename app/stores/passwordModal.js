import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import GoogleAuthActions from 'actions/google_auth';
import PasswordModalActions from 'actions/passwordModal';

@createStore(Alt)
export default class PasswordModalStore {
  static displayName = 'PasswordModalStore';

  constructor() {
    this.email = '';
    this.password = '';

    this.bindListeners({
      create: GoogleAuthActions.CREATE,
      setValue: PasswordModalActions.SET_VALUE
    });
  }

  create(data) {
    this.email = data['user']['email'];
  }

  setValue(obj) {
    this[obj.name] = obj.value;
  }
}
