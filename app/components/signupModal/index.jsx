import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Alert
} from 'react-bootstrap';
import SignupActions from 'actions/signup';
import ApplicationActions from 'actions/application';
import SignupStore from 'stores/signup';
import ApplicationStore from 'stores/application';
import GoogleAuthLink from 'components/googleAuthLink';
import FacebookAuthLink from 'components/facebookAuthLink';

@connectToStores
export default class SignupModal extends React.Component {
  static propTypes = {
    isModalOpen: React.PropTypes.bool,
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      email: React.PropTypes.string,
      password: React.PropTypes.string,
      password_confirmation: React.PropTypes.string
    })
  }

  static getStores(props) {
    return [SignupStore, ApplicationStore];
  }

  static getPropsFromStores(props) {
    return {
      ...SignupStore.getState(),
      ...ApplicationStore.getState()
    };
  }

  setValue(event) {
    SignupActions.setValue(event.target.name, event.target.value);
  }

  signUp = (event) => {
    event.preventDefault();

    if (this.isValid()) {
      SignupActions.create(this.props.user);
    }
  }

  isValid() {
    const user = this.props.user;

    return (
      user.first_name.trim().length &&
      user.last_name.trim().length &&
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

  nameValidationState(value) {
    return value.trim().length ? 'success' : 'error';
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
              return <li key={index}>{message}</li>;
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
        <GoogleAuthLink/>
        <FacebookAuthLink/>

        <form onSubmit={ this.signUp }>
          <Modal.Body>
            <FormGroup
              controlId="first_name"
              validationState={ this.nameValidationState(this.props.user.first_name) }
            >
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                name="first_name"
                onChange={ this.setValue }
              />
            </FormGroup>
            <FormGroup
              controlId="last_name"
              validationState={ this.nameValidationState(this.props.user.last_name) }
            >
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
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
