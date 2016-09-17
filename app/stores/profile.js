import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import session from 'services/session';
import ProfileActions from 'actions/profile';
import SessionActions from 'actions/session';
import SessionStore from 'stores/session';

@createStore(Alt)
export default class ProfileStore {
  static displayName = 'ProfileStore'

  constructor() {
    this.profile = this._profile(session.currentUser());
    this.errorMessages = [];

    this.bindListeners({
      setValue: ProfileActions.SET_VALUE,
      setProfile: SessionActions.CREATE,
      handleProfileUpdate: ProfileActions.UPDATE
    });
  }

  setValue(obj) {
    this.profile[obj.name] = obj.value;
  }

  setProfile() {
    this.waitFor(SessionStore);

    this.profile = this._profile(session.currentUser());
  }

  handleProfileUpdate(response) {
    if (response.status == 422) {
      let validations = response.json['rails_api_format/error']['validations'];

      for (let attribute in validations) {
        for (let message of validations[attribute]) {
          this.errorMessages.push(`${attribute} ${message}`);
        }
      }
    } else if (response.status == 200) {
      this.errorMessages = [];
      this.setProfile();
    }
  }

  _profile(user) {
    let res = {};
    let profileFields = ["first_name", "last_name", "bio", "email", "current_password", "password", "password_confirmation"];

    for (let index in profileFields) {
      let field = profileFields[index];
      res[field] = user[field] || "";
    }

    return res;
  }
}
