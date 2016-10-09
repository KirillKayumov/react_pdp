import config from 'config';
import request from 'lib/request';
import requestAuth from 'lib/requestAuth';

export default class GoogleAuthSource {
  static oauthCallbackUrl = `${config.apiTarget}/v1/users/auth/google_oauth2/callback`;
  static deleteUrl = `${config.apiTarget}/v1/identities/google_oauth2`;

  static authenticate(callback) {
    return this._googleAuthorize((googleAuthorizeResponse) => {
      delete googleAuthorizeResponse["g-oauth-window"];
      let response = this._backendAuthenticate(googleAuthorizeResponse);

      callback(response);
    });
  }

  static connect(callback) {
    return this._googleAuthorize((authorizeResponse) => {
      delete authorizeResponse["g-oauth-window"];
      let response = this._backendConnect(authorizeResponse);

      callback(response);
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

  static _backendAuthenticate(googleAuthorizeResponse) {
    return request(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(googleAuthorizeResponse)
    });
  }

  static _backendConnect(googleAuthorizeResponse) {
    return requestAuth(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify(googleAuthorizeResponse)
    });
  }
}
