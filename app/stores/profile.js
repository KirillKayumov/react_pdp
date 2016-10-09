import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import session from 'services/session';
import ProfileActions from 'actions/profile';
import SessionActions from 'actions/session';
import SessionStore from 'stores/session';
import GoogleAuthActions from 'actions/googleAuth';
import FacebookAuthActions from 'actions/facebookAuth';

@createStore(Alt)
export default class ProfileStore {
  static displayName = 'ProfileStore'

  constructor() {
    this.profile = {};
    this.errorMessages = [];

    this.bindListeners({
      saveProfile: [ProfileActions.LOADED, ProfileActions.UPDATED],
      reset: [ProfileActions.RESET, ProfileActions.LOAD_FAILED],
      setValue: ProfileActions.SET_VALUE,
      handleUpdateFailed: ProfileActions.UPDATE_FAILED,
      // setProfile: [SessionActions.CREATE, GoogleAuthActions.CONNECT, FacebookAuthActions.CONNECT],
    //   handleProfileUpdate: ProfileActions.UPDATE
    });
  }

  saveProfile(json) {
    this.profile = this._profile(json.user);
    this.errorMessages = [];
  }

  reset() {
    this.profile = {};
    this.errorMessages = [];
  }

  setValue(obj) {
    this.profile[obj.name] = obj.value;
  }

  handleUpdateFailed(json) {
    this.errorMessages = [];

    let validations = json['rails_api_format/error']['validations'];

    for (let attribute in validations) {
      for (let message of validations[attribute]) {
        this.errorMessages.push(`${attribute} ${message}`);
      }
    }
  }

  _profile(user) {
    user['current_password'] = '';

    return user;
  }
}
