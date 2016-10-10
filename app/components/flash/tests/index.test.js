import React from 'react';
import { mount } from 'enzyme';
import Flash from 'components/flash';
import { Alert } from 'react-bootstrap';
import FlashActions from 'actions/flash';

describe('Flash', () => {
  let component;

  it('does NOT render alert', () => {
    component = mount(<Flash/>);

    expect(component.contains(Alert)).toEqual(false);
  });

  describe('when message is present', () => {
    beforeEach(() => {
      component = mount(<Flash/>);
      component.setState({ message: 'Awesome message', style: 'success' });
    });

    it('renders alert with message', () => {
      expect(component.find(Alert).text().includes('Awesome message')).toEqual(true);
    });
  });

  describe('dismiss', () => {
    beforeEach(() => {
      component = mount(<Flash/>);
      component.setState({ message: 'Awesome message', style: 'success' });
    });

    it('calls FlashActions.dismiss', () => {
      spyOn(FlashActions, 'dismiss');
      component.find('.close').first().simulate('click');

      expect(FlashActions.dismiss).toHaveBeenCalled();
    });
  });
});
