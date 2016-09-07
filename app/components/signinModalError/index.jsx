import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Alert } from 'react-bootstrap';
import SigninModalErrorStore from 'stores/signinModalError';

@connectToStores
export default class SigninModalError extends React.Component {
  static getStores(_props) {
    return [SigninModalErrorStore];
  }

  static getPropsFromStores(_props) {
    return SigninModalErrorStore.getState();
  }

  render() {
    if (this.props.errorMessage == '') {
      return null;
    }

    return (
      <Alert bsStyle="danger">{this.props.errorMessage}</Alert>
    );
  }
}
