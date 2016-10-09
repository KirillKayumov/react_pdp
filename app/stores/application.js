import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import ApplicationActions from 'actions/application';
import SessionActions from 'actions/session';
import SignupActions from 'actions/signup';
import PasswordActions from 'actions/password';

@createStore(Alt)
export default class ApplicationStore {
  static displayName = 'ApplicationStore'

  constructor() {
    this.isModalOpen = false;
    this.modalName = '';
    this.modalOptions = {};

    this.bindListeners({
      openModal: ApplicationActions.OPEN_MODAL,
      closeModal: ApplicationActions.CLOSE_MODAL
    });
  }

  openModal({ name, ...rest }) {
    this.isModalOpen = true;
    this.modalName = name;
    this.modalOptions = { ...rest };
  }

  closeModal() {
    this.isModalOpen = false;
    this.modalName = '';
  }

  handleSessionCreate(response) {
    if (response.status == 201) {
      if (!response.json.user.password_set_by_user) {
        this.openModal({ name: 'password' });
      } else {
        this.closeModal();
      }
    }
  }

  handleSignupCreate(response) {
    if (response.status == 201) {
      this.closeModal();
    }
  }
}
