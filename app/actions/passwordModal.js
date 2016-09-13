import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import passwordSource from 'sources/password';

@createActions(Alt)
export default class PasswordModalActions {
  setValue(name, value) {
    return { name, value };
  }

  submit(password) {
    return (dispatch) => {
      passwordSource.set(password).then(result => dispatch(result));
    }
  }
}
