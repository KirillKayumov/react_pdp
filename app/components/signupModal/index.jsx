import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap';
import SignUpActions from 'actions/signUp';
import ApplicationActions from 'actions/application';
import SignUpStore from 'stores/signUp';
import ApplicationStore from 'stores/application';
import GoogleAuthLink from 'components/googleAuthLink';
import FacebookAuthLink from 'components/facebookAuthLink';

@connectToStores
export default class SignUpModal extends Component {
  static propTypes = {
    errorMessages: PropTypes.arrayOf(PropTypes.string),
    isModalOpen: PropTypes.bool,
    user: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
      password_confirmation: PropTypes.string
    })
  }

  static getStores(props) {
    return [SignUpStore, ApplicationStore];
  }

  static getPropsFromStores(props) {
    return {
      ...SignUpStore.getState(),
      ...ApplicationStore.getState()
    };
  }

  setValue(event) {
    SignUpActions.setValue(event.target.name, event.target.value);
  }

  signUp = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      SignUpActions.perform(this.props.user);
    }
  }

  isValid() {
    const user = this.props.user;

    return (
      user.email.length >= 6 &&
      user.password.length >= 6 &&
      user.password_confirmation.length >= 6 &&
      this.isValidPassword()
    );
  }

  isValidPassword() {
    return this.props.user.password === this.props.user.password_confirmation;
  }

  validationState(value) {
    return value.length >= 6 ? 'success' : 'error';
  }

  passwordValidationState(value) {
    return (this.isValidPassword() && value.length >= 6) ? 'success' : 'error';
  }

  errorMessage() {
    if (this.props.errorMessages.length) {
      return (
        <Alert bsStyle="danger">
          <ul>
            { this.props.errorMessages.map((message, index) => {
              return <li key={ index }>{ message }</li>;
            }) }
          </ul>
        </Alert>
      );
    }
  }

  render() {
    return (
      <Modal
        bsSize="small"
        show={ this.props.isModalOpen }
        onHide={ ApplicationActions.closeModal }
      >
        <Modal.Header closeButton>
          <h3 className="modal-title">Sign Up</h3>
        </Modal.Header>

        { this.errorMessage() }
        <GoogleAuthLink connected={ false } userAuthenticated={ false }/>
        <FacebookAuthLink connected={ false } userAuthenticated={ false }/>

        <form onSubmit={ this.signUp }>
          <Modal.Body>
            <FormGroup controlId="first_name">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                name="first_name"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup controlId="last_name">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                type="text"
                name="last_name"
                onChange={ this.setValue }
              />
            </FormGroup>
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
                type="password"
                name="password"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="password_confirmation"
              validationState={ this.passwordValidationState(this.props.user.password_confirmation) }
            >
              <ControlLabel>Password Confirmation</ControlLabel>
              <FormControl
                type="password"
                name="password_confirmation"
                onChange={ this.setValue }
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
