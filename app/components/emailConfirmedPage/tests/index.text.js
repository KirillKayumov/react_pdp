import React from 'react';
import { shallow } from 'enzyme';
import EmailConfirmedPage from 'components/emailConfirmedPage';

describe('EmailConfirmedPage', () => {
  const component = shallow(<EmailConfirmedPage/>);

  it('renders EmailConfirmedPage component', () => {
    expect(component.find('h4').text()).toEqual('Your email address has been successfully confirmed.');
  });
});
