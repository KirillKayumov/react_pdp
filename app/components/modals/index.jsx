import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import ApplicationStore from 'stores/application';
import SignInModal from 'components/signInModal';
import SignUpModal from 'components/signUpModal';
import PasswordModal from 'components/passwordModal';

const MODALS = {
  signIn: SignInModal,
  signUp: SignUpModal,
  password: PasswordModal
};

@connectToStores
export default class Modals extends Component {
  static propTypes = {
    modalName: PropTypes.string.isRequired
  }

  static getStores(props) {
    return [ApplicationStore];
  }

  static getPropsFromStores(props) {
    return ApplicationStore.getState();
  }

  renderCurrentModal = () => {
    if (this.props.modalName) {
      const CurrentModal = MODALS[this.props.modalName];

      return <CurrentModal/>;
    }
  }

  render() {
    return (
      <div className="modals">
        { this.renderCurrentModal() }
      </div>
    );
  }
}
