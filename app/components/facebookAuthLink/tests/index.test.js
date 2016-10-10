import React from 'react';
import { mount } from 'enzyme';
import FacebookAuthLink from 'components/facebookAuthLink';
import FacebookAuthActions from 'actions/facebookAuth';

describe('FacebookAuthLink', () => {
  let component, link;

  describe('when it is connected', () => {
    beforeEach(() => {
      component = mount(<FacebookAuthLink connected={ true }/>);
      link = component.find('a');
    });

    it('has facebook class', () => {
      expect(link.hasClass('facebook')).toEqual(true);
    });

    it('has facebook--connected class', () => {
      expect(link.hasClass('facebook--connected')).toEqual(true);
    });
  });

  describe('when it is NOT connected', () => {
    beforeEach(() => {
      component = mount(<FacebookAuthLink connected={ false }/>);
      link = component.find('a');
    });

    it('has facebook class', () => {
      expect(link.hasClass('facebook')).toEqual(true);
    });

    it('has no facebook--connected class', () => {
      expect(link.hasClass('facebook--connected')).toEqual(false);
    });
  });

  describe('click', () => {
    let trigger;

    beforeEach(() => {
      trigger = () => { link.simulate('click'); };
    });

    describe('when it is connected', () => {
      beforeEach(() => {
        component = mount(<FacebookAuthLink connected={ true }/>);
        link = component.find('a');
      });

      it('calls FacebookAuthActions.delete', () => {
        spyOn(FacebookAuthActions, 'delete');
        trigger();

        expect(FacebookAuthActions.delete).toHaveBeenCalled();
      });
    });

    describe('when user authenticated', () => {
      beforeEach(() => {
        component = mount(<FacebookAuthLink connected={ false } userAuthenticated={ true }/>);
        link = component.find('a');
      });

      it('calls FacebookAuthActions.connect', () => {
        spyOn(FacebookAuthActions, 'connect');
        trigger();

        expect(FacebookAuthActions.connect).toHaveBeenCalled();
      });
    });

    describe('when it is NOT connected AND user is NOT authenticated', () => {
      beforeEach(() => {
        component = mount(<FacebookAuthLink connected={ false } userAuthenticated={ false }/>);
        link = component.find('a');
      });

      it('calls FacebookAuthActions.authenticate', () => {
        spyOn(FacebookAuthActions, 'authenticate');
        trigger();

        expect(FacebookAuthActions.authenticate).toHaveBeenCalled();
      });
    });
  });
});
