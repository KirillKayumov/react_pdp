import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SignupSource from 'sources/signup';
import FlashActions from 'actions/flash';
import ApplicationActions from 'actions/application';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  perform(user) {
    return SignupSource.create(user).then(response => {
      switch (response.status) {
      case 201:
        this.signedUp(response);
        break;
      case 422:
        this.signupFailed(response);
        break;
      };
    });
  }

  signedUp(response) {
    FlashActions.set(`
      A message with a confirmation link has been sent to your email address.
      Please follow the link to activate your account.
    `, "info");
    ApplicationActions.closeModal();

    return response;
  }

  signupFailed(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }
}
