import React from 'react';
import { mount } from 'enzyme';
import GoogleAuthLink from 'components/googleAuthLink';
import GoogleAuthActions from 'actions/googleAuth';

describe('GoogleAuthLink', () => {
  let component, link;

  describe('when it is connected', () => {
    beforeEach(() => {
      component = mount(<GoogleAuthLink connected={ true }/>);
      link = component.find('a');
    });

    it('has google_oauth2 class', () => {
      expect(link.hasClass('google_oauth2')).toEqual(true);
    });

    it('has google_oauth2--connected class', () => {
      expect(link.hasClass('google_oauth2--connected')).toEqual(true);
    });
  });

  describe('when it is NOT connected', () => {
    beforeEach(() => {
      component = mount(<GoogleAuthLink connected={ false }/>);
      link = component.find('a');
    });

    it('has google_oauth2 class', () => {
      expect(link.hasClass('google_oauth2')).toEqual(true);
    });

    it('has no google_oauth2--connected class', () => {
      expect(link.hasClass('google_oauth2--connected')).toEqual(false);
    });
  });

  describe('click', () => {
    let trigger;

    beforeEach(() => {
      trigger = () => { link.simulate('click'); };
    });

    describe('when it is connected', () => {
      beforeEach(() => {
        component = mount(<GoogleAuthLink connected={ true }/>);
        link = component.find('a');
      });

      it('calls GoogleAuthActions.delete', () => {
        spyOn(GoogleAuthActions, 'delete');
        trigger();

        expect(GoogleAuthActions.delete).toHaveBeenCalled();
      });
    });

    describe('when user authenticated', () => {
      beforeEach(() => {
        component = mount(<GoogleAuthLink connected={ false } userAuthenticated={ true }/>);
        link = component.find('a');
      });

      it('calls GoogleAuthActions.connect', () => {
        spyOn(GoogleAuthActions, 'connect');
        trigger();

        expect(GoogleAuthActions.connect).toHaveBeenCalled();
      });
    });

    describe('when it is NOT connected AND user is NOT authenticated', () => {
      beforeEach(() => {
        component = mount(<GoogleAuthLink connected={ false } userAuthenticated={ false }/>);
        link = component.find('a');
      });

      it('calls GoogleAuthActions.authenticate', () => {
        spyOn(GoogleAuthActions, 'authenticate');
        trigger();

        expect(GoogleAuthActions.authenticate).toHaveBeenCalled();
      });
    });
  });
});
