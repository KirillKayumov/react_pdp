import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SigninActions from 'actions/signin';
import ApplicationActions from 'actions/application';
import SessionActions from 'actions/session';

@createStore(Alt)
export default class SigninStore {
  static displayName = 'SigninStore'

  defaultProps = {
    email: '',
    password: ''
  }

  constructor() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessage = '';

    this.bindListeners({
      setValue: SigninActions.SET_VALUE,
      reset: ApplicationActions.CLOSE_MODAL,
      handleSessionCreate: SessionActions.CREATE
    });
  }

  setValue(obj) {
    this.user[obj.name] = obj.value;
  }

  reset() {
    this.user = Object.assign({}, this.defaultProps);
    this.errorMessage = '';
  }

  handleSessionCreate(response) {
    if (response.status == 201) {
      this.reset();
    } else if (response.status == 401) {
      this.errorMessage = response.json.error.error
    }
  }
}
