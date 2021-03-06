import config from 'config';
import request from 'lib/request';
import requestAuth from 'lib/requestAuth';

export default class FacebookAuthSource {
  static oauthCallbackUrl = `${config.apiTarget}/v1/users/auth/facebook/callback`;
  static deleteUrl = `${config.apiTarget}/v1/identities/facebook`;

  static authenticate(callback) {
    return this._facebookAuthorize((response) => {
      const backendResponse = this._backendAuthenticate(response.authResponse);

      callback(backendResponse);
    });
  }

  static connect(callback) {
    return this._facebookAuthorize((response) => {
      const backendResponse = this._backendConnect(response.authResponse);

      callback(backendResponse);
    });
  }

  static delete() {
    this.logout();

    return requestAuth(this.deleteUrl, {
      method: 'DELETE'
    });
  }

  static logout() {
    FB.getLoginStatus(response => {
      if (response.status == 'connected') {
        FB.logout();
      }
    });
  }

  static _facebookAuthorize(callback) {
    FB.login(callback);
  }

  static _backendAuthenticate(authorizeResponse) {
    return request(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify({ code: authorizeResponse.signedRequest, access_token: authorizeResponse.accessToken }),
      credentials: 'include'
    });
  }

  static _backendConnect(authorizeResponse) {
    return requestAuth(this.oauthCallbackUrl, {
      method: 'POST',
      body: JSON.stringify({ code: authorizeResponse.signedRequest, access_token: authorizeResponse.accessToken }),
      credentials: 'include'
    });
  }
}
