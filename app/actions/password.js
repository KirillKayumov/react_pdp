import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import passwordSource from 'sources/password';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class PasswordActions {
  setPassword(password) {
    return password;
  }

  submit(password) {
    return (dispatch) => {
      passwordSource.set(password).then(response => {
        if (response.status == 200) {
          FlashActions.set('Your password has been set successfully.');
        }

        dispatch(response);
      });
    }
  }
}
