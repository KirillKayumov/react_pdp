import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import FlashActions from 'actions/flash';
import ProfileActions from 'actions/profile'

@createStore(Alt)
export default class FlashStore {
  static displayName = 'FlashStore'

  constructor() {
    this.message = '';

    this.bindListeners({
      handleDismiss: FlashActions.DISMISS,
      set: FlashActions.SET
    });
  }

  handleDismiss() {
    this.message = '';
  }

  set(message) {
    this.message = message;
  }
}
