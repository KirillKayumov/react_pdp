import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import session from 'services/session';
import signupSource from 'sources/signup';

@createActions(Alt)
export default class SignupActions {
  setValue(name, value) {
    return { name, value };
  }

  create(user) {
    return (dispatch) => {
      signupSource.create(user).then(response => {
        response.json().then(json => {
          dispatch({ status: response.status, json: json });
        });
      });
    };
  }
}
