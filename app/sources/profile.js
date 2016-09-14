import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class ProfileSource {
  static url = `${config.apiTarget}/users/update`;

  static update(user) {
    return requestAuth(this.url, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
    .then(result => result.json())
  }
}
