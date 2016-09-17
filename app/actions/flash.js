import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';

@createActions(Alt)
export default class FlashActions {
  set(message) {
    return message;
  }

  dismiss() {
    return {};
  }
}
