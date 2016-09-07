import config from 'config';
import request from 'lib/request';

export default class SessionSource {
  static url = `${config.apiTarget}/users/sign_in`

  static create(user) {
    return request(this.url, {
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then(result => result.json());
  }

  static delete(user) {
    return request(`${this.url}/${user.id}`, {
      method: 'DELETE'
    });
  }
}
