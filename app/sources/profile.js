import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class ProfileSource {
  static url = `${config.apiTarget}/v1/users/update`;

  static update(user) {
    return requestAuth(this.url, {
      method: 'PUT',
      body: JSON.stringify(user)
    })
  }
}
