import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false
};

export const textStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const textSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const textFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TEXT_START:
      return textStart(state, action);
    case actionTypes.TEXT_SUCCESS:
      return textSuccess(state, action);
    case actionTypes.TEXT_FAIL:
      return textFail(state, action);
    default:
      return state;
  }
};

export default reducer;
