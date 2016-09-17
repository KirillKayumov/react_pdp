import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class PasswordSource {
  static url = `${config.apiTarget}/v1/users/set_password`;

  static set(password) {
    return requestAuth(this.url, {
      method: 'PUT',
      body: JSON.stringify({ password })
    })
  }
}
