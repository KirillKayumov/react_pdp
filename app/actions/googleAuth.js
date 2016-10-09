import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import googleAuthSource from 'sources/googleAuth';
import SessionActions from 'actions/session';
import FlashActions from 'actions/flash';
import ProfileActions from 'actions/profile';

@createActions(Alt)
export default class GoogleAuthActions {
  authenticate() {
    return googleAuthSource.authenticate((promise) => {
      promise.then(response => {
        switch (response.status) {
          case 201:
            this.authenticated(response);
            break;
          case 401:
            this.authenticateFailed(response);
            break;
        }
      });
    });
  }

  authenticated(response) {
    SessionActions.create(response);

    return response;
  }

  authenticateFailed(response) {
    return (dispatch) => {
      response.json().then(json => {
        FlashActions.set(json.error.error, 'danger');
        dispatch(json);
      });
    };
  }

  connect() {
    return (dispatch) => {
      googleAuthSource.connect((promise) => {
        promise.then(response => {
          switch (response.status) {
            case 201:
              this.connected(response);
              break;
          }
        });
      });
    }
  }

  connected(response) {
    ProfileActions.loaded(response);
    FlashActions.set('Google account was successfully connected.', 'success');

    return response;
  }

  delete() {
    return (dispatch) => {
      googleAuthSource.delete().then(response => {
        ProfileActions.loaded(response);
        FlashActions.set('Google account was successfully deleted.', 'success');

        dispatch(response);
      });
    }
  }
}
