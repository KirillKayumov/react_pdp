import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class PasswordSource {
  static url = `${config.apiTarget}/users/set_password`;

  static set(password) {
    return requestAuth(this.url, {
      method: 'POST',
      body: JSON.stringify({ password: password })
    })
    .then(result => result.json())
  }
}
