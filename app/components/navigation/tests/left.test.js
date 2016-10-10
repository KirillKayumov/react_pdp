import React from 'react';
import { mount } from 'enzyme';
import NavigationLeft from 'components/navigation/left';
import NavigationItem from 'components/navigation';

describe('NavigationLeft', () => {
  it('renders NavigationLeft with collection of NavigationItem', () => {
    const links = [{ title: 'cool story1', route: '/1' }, { title: 'cool story2', route: '/2' }];
    const navigationLeftComponent = mount(<NavigationLeft/>);
    navigationLeftComponent.setState({ links });
    const navigationItemNodes = navigationLeftComponent.find(NavigationItem);

    expect(navigationItemNodes.length).toEqual(2);
  });
});
