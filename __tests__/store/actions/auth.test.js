import React from 'react';
import axios from 'jest-mock-axios';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from '../../../store/actions/auth';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockStore = configureMockStore([thunkMiddleware]);

describe('auth actions', () => {
  afterEach(() => {
    axios.reset();
  });

  it('should login action for user', () => {
    expect.assertions(2);

    const store = mockStore();
    store.dispatch(actions.auth('test', 'password'));
    const action = store.getActions();

    const expectedAction = {
      type: actionTypes.AUTH_START
    };

    const mockAuthData = {
      username: 'test',
      password: 'password',
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    };

    const mockURL = '/oauth/token';

    expect(action[0]).toEqual(expectedAction);
    expect(axios.post).toHaveBeenCalledWith(mockURL, mockAuthData);
  });

  describe('logout', () => {
    it('should send revoke request if there is a token', () => {
      expect.assertions(2);

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'token=mymocktoken'
      });

      const store = mockStore();
      store.dispatch(actions.logout());
      const action = store.getActions();

      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT
      };
      const mockURL = '/oauth/revoke';
      const mockToken = {
        token: 'mymocktoken'
      };

      expect(axios.post).toHaveBeenCalledWith(mockURL, mockToken);
      axios.mockResponse();
      expect(action[0]).toEqual(expectedAction);
    });
  });

  describe('authCheckState', () => {
    it('should call logout() if there is no token', () => {
      const store = mockStore();
      store.dispatch(actions.authCheckState());
      const action = store.getActions();

      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT
      };

      const spy = jest.spyOn(actions, 'authCheckState');

      expect(action.length).toEqual(1);
      expect(action[0]).toEqual(expectedAction);
      store.dispatch(actions.authCheckState());
      expect(spy).toBeCalled();
    });

    it('should call logout() if expirateDate exceeds current date', () => {
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `expirationDate=${new Date().getTime() - 1000000}`
      });

      const store = mockStore();
      store.dispatch(actions.authCheckState());
      const action = store.getActions();

      const expectedAction = {
        type: actionTypes.AUTH_LOGOUT
      };

      const spy = jest.spyOn(actions, 'authCheckState');

      expect(action.length).toEqual(1);
      expect(action[0]).toEqual(expectedAction);
      store.dispatch(actions.authCheckState());
      expect(spy).toBeCalled();
    });

    it('should call logout() if expirateDate exceeds current date', () => {
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: `expirationDate=${new Date().getTime() - 1000000}`
      });

      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: 'token=mymocktoken'
      });

      const store = mockStore();
      store.dispatch(actions.authCheckState());
      const action = store.getActions();

      const expectedAction = {
        type: actionTypes.AUTH_SUCCESS
      };

      const spy = jest.spyOn(actions, 'authCheckState');

      expect(action.length).toEqual(1);
      expect(action[0]).toEqual(expectedAction);
      store.dispatch(actions.authCheckState());
      expect(spy).toBeCalled();
    });
  });
});
