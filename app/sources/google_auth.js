import config from 'config';
import request from 'lib/request';

export default class GoogleAuthSource {
  static create(callback) {
    return this.authorize((response) => {
      delete response["g-oauth-window"];

      if (response && !response.error) {
        let result = request("http://localhost:5000/v1/users/auth/google_oauth2/callback", {
          method: 'POST',
          body: JSON.stringify(response)
        })
        .then(result => result.json())

        callback(result);
      }
    });
  }

  static authorize(callback) {
    return gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: '135383344251-fv1vlp4vm8k50b88km94rhiooio6v9e2.apps.googleusercontent.com',
      scope: 'email profile'
    }, callback);
  }
}
