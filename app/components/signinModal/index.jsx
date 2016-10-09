import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import ApplicationActions from 'actions/application';
import ApplicationStore from 'stores/application';
import SignInStore from 'stores/signIn';
import GoogleAuthLink from 'components/googleAuthLink';
import FacebookAuthLink from 'components/facebookAuthLink';
import SignInActions from 'actions/signIn';

@connectToStores
export default class SignInModal extends Component {
  static propTypes = {
    isModalOpen: PropTypes.bool,
    user: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string
    })
  }

  static getStores(props) {
    return [SignInStore, ApplicationStore];
  }

  static getPropsFromStores(props) {
    return {
      ...SignInStore.getState(),
      ...ApplicationStore.getState()
    };
  }

  setValue(event) {
    SignInActions.setValue(event.target.name, event.target.value);
  }

  signIn = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      SignInActions.perform(this.props.user);
    }
  }

  isValid() {
    const user = this.props.user;

    return user.email.length >= 6 && user.password.length >= 6;
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  render() {
    return (
      <Modal
        bsSize="small"
        show={ this.props.isModalOpen }
        onHide={ ApplicationActions.closeModal }
      >
        <Modal.Header closeButton>
          <h3 className="modal-title">Sign In</h3>
        </Modal.Header>

        <GoogleAuthLink connected={ false } userAuthenticated={ false }/>
        <FacebookAuthLink connected={ false } userAuthenticated={ false }/>

        <form onSubmit={ this.signIn }>
          <Modal.Body>
            <FormGroup
              controlId="email"
              validationState={ this.validationState(this.props.user.email) }
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                name="email"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="password"
              validationState={ this.validationState(this.props.user.password) }
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                autoComplete="off"
                name="password"
                onChange={ this.setValue }
                type="password"
              />
            </FormGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              type="submit"
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
