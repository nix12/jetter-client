import React from 'react';
import axios from 'jest-mock-axios';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import * as actions from '../../../store/actions/user';
import * as actionTypes from '../../../store/actions/actionTypes';

const mockStore = configureMockStore([thunkMiddleware]);

describe('auth actions', () => {
  afterEach(() => {
    axios.reset();
  });

  it('should login action for user', () => {
    expect.assertions(3);

    const store = mockStore();
    store.dispatch(
      actions.update('test', 'password', 'newpassword', 'newpassword')
    );
    const action = store.getActions();

    const expectedAction = {
      type: actionTypes.UPDATE_START
    };

    const mockUpdateData = {
      user: {
        username: 'test',
        current_password: 'password',
        password: 'newpassword',
        password_confirmation: 'newpassword'
      }
    };

    const mockURL = '/api/users';

    const spy = jest.spyOn(actions, 'update');

    expect(action[0]).toEqual(expectedAction);
    expect(axios.put).toHaveBeenCalledWith(mockURL, mockUpdateData);
    store.dispatch(
      actions.update('test', 'password', 'newpassword', 'newpassword')
    );
    expect(spy).toBeCalled();
  });
});
