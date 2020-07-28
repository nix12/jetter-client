import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  error: null,
  loading: false,
  voter: {
    votes: {
      upvoted: [],
      downvoted: []
    },
    history: [],
    saved: []
  }
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

export const updateUpvoted = (state, action) => {
  return updateObject(state, {
    voter: {
      ...state.votef,
      votes: {
        ...state.voter.votes,
        upvoted: action.upvoted
      }
    }
  });
};

export const updateDownvoted = (state, action) => {
  return updateObject(state, {
    voter: {
      ...state.voter,
      votes: {
        ...state.voter.votes,
        downvoted: action.downvoted
      }
    }
  });
};

export const savedPosts = (state, action) => {
  return updateObject(state, {
    voter: {
      ...state.voter,
      saved: action.saved
    }
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
    case actionTypes.UPDATE_UPVOTED:
      return updateUpvoted(state, action);
    case actionTypes.UPDATE_DOWNVOTED:
      return updateDownvoted(state, action);
    case actionTypes.SAVED_POSTS:
      return savedPosts(state, action);
    default:
      return state;
  }
};

export default reducer;
