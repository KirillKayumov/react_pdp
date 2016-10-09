import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SignInActions from 'actions/signIn';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SignInStore {
  static displayName = 'SignInStore'

  defaultProps = {
    email: '',
    password: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);

    this.bindListeners({
      setValue: SignInActions.SET_VALUE,
      handleSignInFailed: SignInActions.SIGN_IN_FAILED,
      reset: ApplicationActions.CLOSE_MODAL
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
  }

  handleSignInFailed(json) {
    this.errorMessage = json.error.error;
  }
}
