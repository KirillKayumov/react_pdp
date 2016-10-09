import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import ProfileActions from 'actions/profile';
import ApplicationActions from 'actions/application';

@createActions(Alt)
export default class PasswordActions {
  setPassword(password) {
    return password;
  }

  submit(password) {
    ProfileActions.update({ password });
    ApplicationActions.closeModal();

    return password;
  }
}
