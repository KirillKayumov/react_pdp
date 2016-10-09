import React, { PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap';
import ApplicationStore from 'stores/application';
import PasswordStore from 'stores/password';
import ApplicationActions from 'actions/application';
import PasswordActions from 'actions/password';
import ProfileStore from 'stores/profile';

@connectToStores
export default class PasswordModal extends React.Component {
  static propTypes = {
    isModalOpen: PropTypes.bool,
    password: PropTypes.string,
    profile: PropTypes.shape({
      first_name: PropTypes.string
    })
  }

  static getStores(props) {
    return [ApplicationStore, ProfileStore, PasswordStore];
  }

  static getPropsFromStores(props) {
    return {
      ...ApplicationStore.getState(),
      ...ProfileStore.getState(),
      ...PasswordStore.getState()
    };
  }

  setPassword(event) {
    PasswordActions.setPassword(event.target.value);
  }

  submit = (event) => {
    event.preventDefault();

    if (this.props.password.length >= 6) {
      PasswordActions.submit(this.props.password);
    }
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  render() {
    return (
      <Modal bsSize="small" show={ this.props.isModalOpen }
        onHide={ ApplicationActions.closeModal }
      >
        <Modal.Header closeButton>
          <h3 className="modal-title">Hello { this.props.profile.first_name }!</h3>
        </Modal.Header>
        <form onSubmit={ this.submit }>
          <Modal.Body>
            <h4>Enter password:</h4>

            <FormGroup controlId="password" validationState={ this.validationState(this.props.password) }>
              <FormControl type="password" name="password"
                onChange={ this.setPassword }
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
