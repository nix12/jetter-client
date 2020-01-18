import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false
};

export const updateStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const updateSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const updateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_START:
      return updateStart(state, action);
    case actionTypes.UPDATE_SUCCESS:
      return updateSuccess(state, action);
    case actionTypes.UPDATE_FAIL:
      return updateFail(state, action);
    default:
      return state;
  }
};

export default reducer;
