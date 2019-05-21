import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  currentUser: {
    isLoggedIn: false,
    userId: null,
    username: null,
    loading: false,
    error: null,
  }
};

const authStart = (state, action) => {
  return updateObject(state, { 
    ...state,
    currentUser: {
      ...state.currentUser,
      error: null, 
      loading: true
    } 
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    ...state,
    currentUser: {
      ...state.currentUser,
      isLoggedIn: true,
      userId: action.userId,
      username: action.username,
      error: null,
      loading: false
    }
  });
};

const authFail = (state, action) => {
  return updateObject(state, { 
    ...state,
    currentUser: {
      ...state.currentUser,
      error: action.error, 
      loading: false
    } 
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    ...state,
    currentUser: {
      ...state.currentUser,
      isLoggedIn: false,
      userId: null,
      username: null,
    }
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (actionTypes.AUTH_START) : return authStart(state, action);
    case (actionTypes.AUTH_SUCCESS) : return authSuccess(state, action);
    case (actionTypes.AUTH_FAIL) : return authFail(state, action);
    case (actionTypes.AUTH_LOGOUT) : return authLogout(state, action);
    default: return state;
  }
}

export default reducer;