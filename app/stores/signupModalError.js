import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SignupModalErrorStore {
  static displayName = 'SignupModalErrorStore'

  constructor() {
    this.messages = [];

    this.bindListeners({
      handleSignupCreate: SignupActions.CREATE,
      handleCloseModal: ApplicationActions.CLOSE_MODAL
    });
  }

  handleSignupCreate(data) {
    let messages = []

    if (data['rails_api_format/error']) {
      let validations = data['rails_api_format/error']['validations']

      for (let attribute in validations) {
        for (let message of validations[attribute]) {
          messages.push(`${attribute} ${message}`);
        }
      }
    }

    this.messages = messages;
  }

  handleCloseModal() {
    this.messages = [];
  }
}
