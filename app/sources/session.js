import config from 'config';
import request from 'lib/request';
import requestAuth from 'lib/requestAuth';

export default class SessionSource {
  static signinUrl = `${config.apiTarget}/users/sign_in`
  static signoutUrl = `${config.apiTarget}/users/sign_out`

  static create(user) {
    return request(this.signinUrl, {
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(result => result.json());
  }

  static delete(_user) {
    return requestAuth(this.signoutUrl, {
      method: 'DELETE'
    });
  }
}
