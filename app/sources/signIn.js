import config from 'config';
import request from 'lib/request';

export default class SignInSource {
  static url = `${config.apiTarget}/v1/users/sign_in`

  static perform(user) {
    return request(this.url, {
      method: 'POST',
      body: JSON.stringify(user)
    });
  }
};
