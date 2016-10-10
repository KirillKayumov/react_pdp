import React from 'react';
import { shallow } from 'enzyme';
import Application from 'components/application';
import Header from 'components/header';
import Modals from 'components/modals';
import Footer from 'components/footer';
import Flash from 'components/flash';

describe('Application', () => {
  const applicationComponent = shallow(<Application/>);

  it('renders Application component with child components', () => {
    expect(applicationComponent.contains(<Flash/>)).toEqual(true);
    expect(applicationComponent.find('main').length).toEqual(1);
    expect(applicationComponent.contains(<Header/>)).toEqual(true);
    expect(applicationComponent.contains(<Modals/>)).toEqual(true);
    expect(applicationComponent.contains(<Footer/>)).toEqual(true);
  });
});
