import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false
};

export const linkStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

export const linkSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

export const linkFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LINK_START:
      return linkStart(state, action);
    case actionTypes.LINK_SUCCESS:
      return linkSuccess(state, action);
    case actionTypes.LINK_FAIL:
      return linkFail(state, action);
    default:
      return state;
  }
};

export default reducer;
