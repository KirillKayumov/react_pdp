import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import SignOutSource from 'sources/signOut';
import config from 'config';
import FacebookAuthSource from 'sources/facebookAuth';
import Storage from 'lib/storage';
import appHistory from 'services/history';
import { paths } from 'helpers/routes';
import FlashActions from 'actions/flash';
import ApplicationActions from 'actions/application';

const STORAGE_KEY = config.storageKey;

@createActions(Alt)
export default class SessionActions {
  create(response) {
    return (dispatch) => {
      response.json().then(json => {
        const { user } = json;

        dispatch(user);

        Storage.set(STORAGE_KEY, user);
        ApplicationActions.closeModal();
        appHistory.push(paths.profile());
      });
    };
  }

  delete(user) {
    SignOutSource.perform(user);
    Storage.remove(STORAGE_KEY);
    appHistory.push(paths.home());
    FB.logout();

    return user;
  }
}
