import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import session from 'services/session';
import ProfileActions from 'actions/profile';

@createStore(Alt)
export default class ProfileStore {
  static displayName = 'ProfileStore'

  constructor() {
    this.user = {
      first_name: session.currentUser()['first_name'],
      last_name: session.currentUser()['last_name'],
      bio: session.currentUser()['bio'],
      email: session.currentUser()['email'],
      current_password: ''
    }

    this.bindListeners({
      setValue: ProfileActions.SET_VALUE
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }
}
