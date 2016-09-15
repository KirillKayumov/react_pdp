import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SignupStore {
  static displayName = 'SignupStore'

  defaultProps = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessages = [];

    this.bindListeners({
      setValue: SignupActions.SET_VALUE,
      reset: ApplicationActions.CLOSE_MODAL,
      handleSignupCreate: SignupActions.CREATE
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessages = [];
  }

  handleSignupCreate(response) {
    if (response.status == 201) {
      this.reset();
    } else if (response.status == 422) {
      let validations = response.json['rails_api_format/error']['validations']

      for (let attribute in validations) {
        for (let message of validations[attribute]) {
          this.errorMessages.push(`${attribute} ${message}`);
        }
      }
    }
  }
}
