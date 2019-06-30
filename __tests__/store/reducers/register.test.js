import * as actionTypes from '../../../store/actions/actionTypes';

import * as reducers from '../../../store/reducers/register';

describe('register reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      error: null,
      loading: false
    };
  });

  it('handles REGISTER_START action', () => {
    expect(
      reducers.registerStart(initialState, {
        type: actionTypes.REGISTER_START
      })
    ).toEqual({
      error: null,
      loading: true
    });
  });

  it('handles REGISTER_SUCCESS action', () => {
    expect(
      reducers.registerSuccess(initialState, {
        type: actionTypes.REGISTER_SUCCESS
      })
    ).toEqual({
      error: null,
      loading: false
    });
  });

  it('handles REGISTER_FAIL action', () => {
    expect(
      reducers.registerFail(initialState, {
        type: actionTypes.REGISTER_FAIL,
        error: 'register fail'
      })
    ).toEqual({
      error: 'register fail',
      loading: false
    });
  });
});
