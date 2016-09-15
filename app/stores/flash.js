import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import FlashActions from 'actions/flash';
import SignupActions from 'actions/signup';

@createStore(Alt)
export default class FlashStore {
  static displayName = 'FlashStore'

  constructor() {
    this.message = '';

    this.bindListeners({
      handleDismiss: FlashActions.DISMISS,
      handleSignupCreate: SignupActions.CREATE
    });
  }

  handleDismiss() {
    this.message = '';
  }

  handleSignupCreate(response) {
    if (response.status == 201) {
      this.message = `
        You will receive an email with instructions for how to confirm your email address in a few minutes.
      `;
    }
  }
}
