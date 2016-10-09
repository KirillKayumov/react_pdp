import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SignUpSource from 'sources/signUp';
import FlashActions from 'actions/flash';
import ApplicationActions from 'actions/application';

@createActions(Alt)
export default class SignUpActions {
  setValue(name, value) {
    return { name, value };
  }

  perform(user) {
    return SignUpSource.create(user).then(response => {
      switch (response.status) {
      case 201:
        this.signedUp(response);
        break;
      case 422:
        this.signUpFailed(response);
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

  signUpFailed(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }
}
