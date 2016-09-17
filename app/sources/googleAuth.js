import config from 'config';
import request from 'lib/request';
import requestAuth from 'lib/requestAuth';

export default class GoogleAuthSource {
  static oauthCallbackUrl = `${config.apiTarget}/v1/users/auth/google_oauth2/callback`;
  static deleteUrl = `${config.apiTarget}/v1/identities/google_oauth2`;

  static create(callback) {
    return this._googleAuthorize((authorizeResponse) => {
      delete authorizeResponse["g-oauth-window"];

      if (authorizeResponse && !authorizeResponse.error) {
        let response = this._backendAuthorize(authorizeResponse);

        callback(response);
      }
    });
  }

  static connect(callback) {
    return this._googleAuthorize((authorizeResponse) => {
      delete authorizeResponse["g-oauth-window"];

      if (authorizeResponse && !authorizeResponse.error) {
        let response = this._backendConnect(authorizeResponse);

        callback(response);
      }
    });
  }

  static delete() {
    return requestAuth(this.deleteUrl, {
      method: 'DELETE'
    })
  }

  static _googleAuthorize(callback) {
    return gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: config.googleClientId,
      scope: 'email profile'
    }, callback);
  }

  static _backendAuthorize(authorizeResponse) {
    return request(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(authorizeResponse)
    })
    .then(response => {
      let status = response.status;

      return response.json().then(json => {
        return { status, json };
      });
    });
  }

  static _backendConnect(authorizeResponse) {
    return requestAuth(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(authorizeResponse)
    });
  }
}
