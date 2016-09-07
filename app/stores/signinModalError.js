import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import SessionActions from 'actions/session';
import ApplicationActions from 'actions/application';

@createStore(Alt)
export default class SigninModalErrorStore {
  static displayName = 'SigninModalErrorStore'

  constructor() {
    this.errorMessage = '';

    this.bindListeners({
      handleSessionCreate: SessionActions.CREATE,
      handleCloseModal: ApplicationActions.CLOSE_MODAL
    });
  }

  handleSessionCreate(data) {
    if (data['error']) {
      this.errorMessage = data['error']['error']
    }
  }

  handleCloseModal() {
    this.errorMessage = '';
  }
}
