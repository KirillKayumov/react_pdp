import 'stylesheets/application';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import appHistory from 'services/history';
import { requireAuth } from 'helpers/routes';
import Application from 'components/application';
import Home from 'components/home';
import EmailConfirmedPage from 'components/emailConfirmedPage';
import Profile from 'components/profile';
import { paths } from 'helpers/routes';

render((
  <Router history={ appHistory }>
    <Route component={ Application }>
      <Route path={ paths.home() } component={ Home }/>
      <Route path={ paths.emailConfirmed() } component={ EmailConfirmedPage }/>
      <Route path={ paths.profile() } component={ Profile }/>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
), document.getElementById('app'));
