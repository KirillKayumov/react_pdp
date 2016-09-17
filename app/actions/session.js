import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import sessionSource from 'sources/session';
import config from 'config';

const STORAGE_KEY = config.storageKey;

@createActions(Alt)
export default class SessionActions {
  create(user, response = undefined) {
    return (dispatch) => {
      if (response) {
        dispatch(response);
      } else {
        sessionSource.create(user).then(response => {
          response.json().then(json => {
            dispatch({ status: response.status, json });
          });
        });
      }
    };
  }

  delete(user) {
    return (dispatch) => {
      sessionSource.delete(user).then(response => {
        dispatch(response);
      });
    };
  }
}
