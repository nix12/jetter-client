import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';
import axiosForum from '../../services/axios/axios-forum';

export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START
  };
};

export const updateSuccess = () => {
  return {
    type: actionTypes.UPDATE_SUCCESS
  };
};

export const updateFail = error => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error
  };
};

export const update = (
  username,
  currentPassword,
  password,
  passwordConfirmation
) => dispatch => {
  dispatch(updateStart());

  const url = `/api/users`;
  const userData = {
    user: {
      username,
      current_password: currentPassword,
      password,
      password_confirmation: passwordConfirmation
    }
  };

  return axios
    .put(url, userData)
    .then(() => {
      dispatch(updateSuccess());
    })
    .catch(err => {
      dispatch(updateFail(err.response.data.error));
    });
};

// Voter Actions

export const updateUpvoted = upvoted => {
  return {
    type: actionTypes.UPDATE_UPVOTED,
    upvoted
  };
};

export const updateDownvoted = downvoted => {
  return {
    type: actionTypes.UPDATE_DOWNVOTED,
    downvoted
  };
};

export const getUpvoted = username => dispatch => {
  const url = `/api/voters/${username}/upvoted`;

  return axiosForum.get(url).then(response => {
    dispatch(updateUpvoted(response.data.upvoted_posts));
  });
};

export const getDownvoted = username => dispatch => {
  const url = `/api/voters/${username}/downvoted`;

  return axiosForum.get(url).then(response => {
    dispatch(updateDownvoted(response.data.downvoted_posts));
  });
};

// Saving Posts

export const savedPosts = saved => {
  return {
    type: actionTypes.SAVED_POSTS,
    saved
  };
};

export const save = (username, postId, commentId) => dispatch => {
  const url = `/api/voters/${username}/saved_posts`;

  const savedData = {
    saved_post: {
      post_id: postId,
      comment_id: commentId,
      voter_id: username
    }
  };

  return axiosForum.post(url, savedData);
};

export const unsave = (username, postId, commentId) => dispatch => {
  const url = `/api/voters/${username}/saved_posts`;

  const savedData = {
    saved_post: {
      post_id: postId,
      comment_id: commentId,
      voter_id: username
    }
  };

  return axiosForum.delete(url, savedData);
};

export const getSavedPosts = username => dispatch => {
  const url = `/api/voters/${username}/saved_posts`;

  const savedData = {
    params: {
      voter_id: username
    }
  };

  return axiosForum.get(url, savedData).then(response => {
    console.log('action', response);
    dispatch(savedPosts(response.data.saved_posts));
  });
};
