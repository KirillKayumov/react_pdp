import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import profileSource from 'sources/profile';
import FlashActions from 'actions/flash';

@createActions(Alt)
export default class ProfileActions {
  update(profile) {
    return (dispatch) => {
      profileSource.update(profile).then(response => {
        if (response.status == 200) {
          FlashActions.set('Your profile has been updated successfully.');
        }

        response.json().then(json => {
          dispatch({ status: response.status, json });
        });
      });
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
