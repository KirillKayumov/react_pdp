import config from 'config';
import requestAuth from 'lib/requestAuth';

export default class SignoutSource {
  static url = `${config.apiTarget}/v1/users/sign_out`

  static perform(user) {
    return requestAuth(this.url, {
      method: 'DELETE'
    });
  }
};
