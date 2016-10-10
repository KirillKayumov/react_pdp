import React from 'react';
import { mount } from 'enzyme';
import Home from 'components/home';

describe('Home', () => {
  const homeComponent = mount(<Home/>);

  it('renders title', () => {
    expect(homeComponent.find('h1').text()).toEqual('Social PDP');
  });

  it('renders description text', () => {
    const innerText = 'Awesome application to try Oauth authentication based on React and Flux technologies.';

    expect(homeComponent.find('p').text()).toContain(innerText);
  });
});
