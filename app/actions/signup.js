import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import session from 'services/session';
import signupSource from 'sources/signup';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  create(user) {
    return (dispatch) => {
      signupSource.create(user).then(response => {
        response.json().then(json => {
          if (response.status == 201) {
            FlashActions.set(`
              You will receive an email with instructions for how to confirm your email address in a few minutes.
            `)
          }

          dispatch({ status: response.status, json });
        });
      });
    };
  }
}
