import * as actionTypes from '../../../store/actions/actionTypes';

import * as reducers from '../../../store/reducers/user';

describe('register reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      error: null,
      loading: false
    };
  });

  it('handles UPDATE_START action', () => {
    expect(
      reducers.updateStart(initialState, {
        type: actionTypes.UPDATE_START
      })
    ).toEqual({
      error: null,
      loading: true
    });
  });

  it('handles UPDATE_SUCCESS action', () => {
    expect(
      reducers.updateSuccess(initialState, {
        type: actionTypes.UPDATE_SUCCESS
      })
    ).toEqual({
      error: null,
      loading: false
    });
  });

  it('handles UPDATE_FAIL action', () => {
    expect(
      reducers.updateFail(initialState, {
        type: actionTypes.UPDATE_FAIL,
        error: 'Update failed'
      })
    ).toEqual({
      error: 'Update failed',
      loading: false
    });
  });
});
