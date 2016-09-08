module.exports = {
  target: 'http://react-base.herokuapp.com',
  apiTarget: 'https://social-pdp-api.herokuapp.com/v1',
  storageKey: 'user_session',
  session: {
    tokenKey: 'authentication_token',
    emailKey: 'email'
  }
};
