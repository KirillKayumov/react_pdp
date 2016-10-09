import session from 'services/session';

export const paths = {
  home() { return '/'; },
  profile() { return '/profile'; },
  emailConfirmed() { return '/email_confirmed'; }
};

export function requireAuth(nextState, replace) {
  if (!session.loggedIn()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};
