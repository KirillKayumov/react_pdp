import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import facebookAuthSource from 'sources/facebookAuth';
import SessionActions from 'actions/session';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class FacebookAuthActions {
  create() {
    return (dispatch) => {
      facebookAuthSource.create((promise) => {
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
      facebookAuthSource.connect((promise) => {
        promise.then(response => {
          if (response.status == 201) {
            FlashActions.set('Successfully authenticated from Facebook account.');
          } else {
            FlashActions.set('Could not authenticate you from Facebook.');
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
      facebookAuthSource.delete().then(response => {
        if (response.status == 200) {
          FlashActions.set('Facebook account was successfully deleted.');
        }

        response.json().then(json => {
          dispatch({ status: response.status, json });
        });
      });
    }
  }
}
