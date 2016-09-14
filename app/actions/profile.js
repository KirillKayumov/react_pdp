import Alt from 'altFlux';
import { createActions } from 'alt-utils/lib/decorators';
import profileSource from 'sources/profile';

@createActions(Alt)
export default class ProfileActions {
  update(user) {
    return (dispatch) => {
      profileSource.update(user).then(result => {
        console.log(result);
        dispatch(result);
      });
    };
  }

  setValue(name, value) {
    return { name, value };
  }
}
