import React from 'react';
import axios from 'jest-mock-axios';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from '../../../store/actions/register';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockStore = configureMockStore([thunkMiddleware]);

describe('auth actions', () => {
  afterEach(() => {
    axios.reset();
  });

  it('should login action for user', () => {
    expect.assertions(3);

    const store = mockStore();
    store.dispatch(actions.register('test', 'password'));
    const action = store.getActions();

    const expectedAction = {
      type: actionTypes.REGISTER_START
    };

    const mockRegisterData = {
      user: {
        username: 'test',
        password: 'password',
        password_confirmation: 'password'
      }
    };

    const mockURL = '/api/users';

    const spy = jest.spyOn(actions, 'register');

    expect(action[0]).toEqual(expectedAction);
    expect(axios.post).toHaveBeenCalledWith(mockURL, mockRegisterData);
    store.dispatch(actions.register('test', 'password'));
    expect(spy).toBeCalled();
  });
});
