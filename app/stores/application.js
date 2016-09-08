import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import ApplicationActions from 'actions/application';
import SessionActions from 'actions/session';
import SignupActions from 'actions/signup';

@createStore(Alt)
export default class ApplicationStore {
  static displayName = 'ApplicationStore'

  constructor() {
    this.isModalOpen = false;
    this.modalName = '';
    this.modalOptions = {};

    this.bindListeners({
      openModal: ApplicationActions.OPEN_MODAL,
      closeModal: ApplicationActions.CLOSE_MODAL,
      handleSessionCreate: SessionActions.CREATE,
      handleSignupCreate: SignupActions.CREATE
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

  handleSessionCreate(data) {
    if (!data['error']) {
      this.closeModal();
    }
  }

  handleSignupCreate(data) {
    if (!data['rails_api_format/error']) {
      this.closeModal();
    }
  }
}
