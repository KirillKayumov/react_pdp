import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import googleAuthSource from 'sources/googleAuth';
import SessionActions from 'actions/session';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class GoogleAuthActions {
  create() {
    return (dispatch) => {
      googleAuthSource.create((promise) => {
        promise.then(response => {
          if (response.status == 201) {
            SessionActions.create(null, response);
          }
          dispatch(response);
        });
      });
    }
  }

  connect() {
    return (dispatch) => {
      googleAuthSource.connect((promise) => {
        promise.then(response => {
          if (response.status == 201) {
            FlashActions.set('Successfully authenticated from Google account.');
          } else {
            FlashActions.set('Could not authenticate you from Google.');
          }

          response.json().then(json => {
            dispatch({ status: response.status, json });
          });
        });
      });
    }
  }

  delete() {
    return (dispatch) => {
      googleAuthSource.delete().then(response => {
        if (response.status == 200) {
          FlashActions.set('Google account was successfully deleted.');
        }

        response.json().then(json => {
          dispatch({ status: response.status, json });
        });
      });
    }
  }
}
