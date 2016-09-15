module.exports = {
  target: 'http://localhost:8000',
  apiTarget: 'http://localhost:5000',
  apiPath: '/v1',
  storageKey: 'user_session',
  session: {
    tokenKey: 'authentication_token',
    emailKey: 'email'
  }
};
