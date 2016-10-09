import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SigninSource from 'sources/signin';
import SessionActions from 'actions/session';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class SigninActions {
  perform(user) {
    return SigninSource.perform(user).then(response => {
      switch (response.status) {
      case 201:
        this.signedIn(response);
        break;
      case 401:
        this.signinFailed(response);
        break;
      };
    });
  }

  signedIn(response) {
    SessionActions.create(response);

    return response;
  }

  signinFailed(response) {
    return (dispatch) => {
      response.json().then(json => {
        FlashActions.set(json.error.error, 'danger');
        dispatch(json);
      });
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
