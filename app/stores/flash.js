import Alt from 'altFlux';
import { createStore } from 'alt-utils/lib/decorators';
import FlashActions from 'actions/flash';
import ProfileActions from 'actions/profile'

@createStore(Alt)
export default class FlashStore {
  static displayName = 'FlashStore'

  constructor() {
    this.message = '';
    this.style = '';

    this.bindListeners({
      handleDismiss: FlashActions.DISMISS,
      set: FlashActions.SET
    });
  }

  handleDismiss() {
    this.message = '';
    this.style = '';
  }

  set({ message, style }) {
    this.message = message;
    this.style = style;
  }
}
