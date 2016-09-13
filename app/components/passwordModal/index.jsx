import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import ApplicationStore from 'stores/application';
import PasswordModalStore from 'stores/passwordModal';
import ApplicationActions from 'actions/application';
import PasswordModalActions from 'actions/passwordModal';

@connectToStores
export default class PasswordModal extends React.Component {
  static getStores(props) {
    return [ApplicationStore, PasswordModalStore];
  }

  static getPropsFromStores(props) {
    return {
      ...ApplicationStore.getState(),
      ...PasswordModalStore.getState()
    };
  }

  setValue(event) {
    PasswordModalActions.setValue(event.target.name, event.target.value);
  }

  submit = (event) => {
    event.preventDefault();

    PasswordModalActions.submit(this.props.password);
  }

  render() {
    return (
      <Modal bsSize="small" show={ this.props.isModalOpen } onHide={ ApplicationActions.closeModal }>
        <Modal.Header closeButton>
          <h3 className="modal-title">Enter password</h3>
        </Modal.Header>
        <form onSubmit={ this.submit }>
          <Modal.Body>
            <h4>Hello { this.props.email }</h4>
            <ControlLabel>Password</ControlLabel>
            <FormControl type="password" name="password" onChange={ this.setValue }/>
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
