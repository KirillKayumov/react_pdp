import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import ProfileSource from 'sources/profile';
import FlashActions from 'actions/flash';
import ApplicationActions from 'actions/application';
import appHistory from 'services/history';
import { paths } from 'helpers/routes';

@createActions(Alt)
export default class ProfileActions {
  load() {
    return ProfileSource.load().then(response => {
      switch (response.status) {
      case 200:
        this.loaded(response);
        break;
      case 401:
        this.loadFailed(response);
        break;
      }
    });
  }

  loaded(response) {
    return (dispatch) => {
      response.json().then(json => {
        if (!json.user.password_set_by_user) {
          ApplicationActions.openModal({ name: 'password' });
        }

        dispatch(json);
      });
    };
  }

  loadFailed(response) {
    appHistory.push(paths.home());
    FlashActions.set('You need to sign in or sign up before continuing.', 'danger');

    return response;
  }

  reset() {
    return {};
  }

  update(profile) {
    return ProfileSource.update(profile).then(response => {
      switch (response.status) {
      case 200:
        this.updated(response);
        break;
      case 422:
        this.updateFailed(response);
        break;
      }
    });
  }

  updated(response) {
    return (dispatch) => {
      FlashActions.set('Your account has been updated successfully.', 'success');
      response.json().then(json => dispatch(json));
    };
  }

  updateFailed(response) {
    return (dispatch) => {
      response.json().then(json => dispatch(json));
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
