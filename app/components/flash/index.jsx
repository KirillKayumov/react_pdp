import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Alert } from 'react-bootstrap';
import FlashActions from 'actions/flash';
import FlashStore from 'stores/flash';
import styles from './styles';

@connectToStores
export default class Flash extends React.Component {
  static getStores(props) {
    return [FlashStore];
  }

  static getPropsFromStores(props) {
    return FlashStore.getState();
  }

  componentDidUpdate() {
    if (this.props.message != '') {
      setTimeout(() => {
        FlashActions.dismiss();
      }, 3000);
    }
  }

  handleDismiss() {
    FlashActions.dismiss();
  }

  render() {
    if (this.props.message) {
      return (
        <div className={ styles.flash }>
          <Alert bsStyle={ this.props.style } onDismiss={ this.handleDismiss }>{ this.props.message }</Alert>
        </div>
      )
    } else {
      return null;
    }
  }
}
