import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Alert } from 'react-bootstrap';
import SignupModalErrorStore from 'stores/signupModalError';

@connectToStores
export default class SignupModalError extends React.Component {
  static getStores(_props) {
    return [SignupModalErrorStore];
  }

  static getPropsFromStores(_props) {
    return SignupModalErrorStore.getState();
  }

  render() {
    if (this.props.messages.length == 0) {
      return null;
    }

    return (
      <Alert bsStyle="danger">
        <ul>
          { this.props.messages.map((message, index) => {
            return <li key={index}>{message}</li>;
          }) }
        </ul>
      </Alert>
    );
  }
}
