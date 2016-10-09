import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import session from 'services/session';
import signupSource from 'sources/signup';
import FlashActions from 'actions/flash';
import ApplicationActions from 'actions/application';
import SessionActions from 'actions/session';
import appHistory from 'services/history';
import { paths } from 'helpers/routes';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  perform(user) {
    return signupSource.create(user).then(response => {
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
    FlashActions.set("A message with a confirmation link has been sent to your email address. Please follow the link to activate your account.", "info");
    ApplicationActions.closeModal();

    return response;
  }

  signUpFailed(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }

    //
    //   response.json().then(json => {
    //     if (response.status == 201) {
    //       FlashActions.set(`
    //         You will receive an email with instructions for how to confirm your email address in a few minutes.
    //       `)
    //     }
    //
    //     dispatch({ status: response.status, json });
    //   });
    // });
}
