import * as actionTypes from '../../../store/actions/actionTypes';

import * as reducers from '../../../store/reducers/auth';

describe('auth reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentUser: {
        isLoggedIn: false,
        userId: null,
        username: null,
        loading: false,
        error: null
      }
    };
  });

  it('handles AUTH_START action', () => {
    expect(
      reducers.authStart(initialState, {
        type: actionTypes.AUTH_START
      })
    ).toEqual({
      currentUser: {
        loading: true,
        error: null
      }
    });
  });

  it('handles AUTH_SUCCESS action', () => {
    expect(
      reducers.authSuccess(initialState, {
        type: actionTypes.AUTH_SUCCESS,
        userId: 1,
        username: 'test'
      })
    ).toEqual({
      currentUser: {
        isLoggedIn: true,
        userId: 1,
        username: 'test',
        error: null,
        loading: false
      }
    });
  });

  it('handles AUTH_FAIL action', () => {
    expect(
      reducers.authFail(initialState, {
        type: actionTypes.AUTH_FAIL,
        error: 'authentication failure'
      })
    ).toEqual({
      currentUser: {
        loading: false,
        error: 'authentication failure'
      }
    });
  });

  it('handles AUTH_LOGOUT action', () => {
    expect(
      reducers.authLogout(initialState, {
        type: actionTypes.AUTH_LOGOUT,
        error: 'authentication failure'
      })
    ).toEqual({
      currentUser: {
        isLoggedIn: false,
        userId: null,
        username: null
      }
    });
  });
});
