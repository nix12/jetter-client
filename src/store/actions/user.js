import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';

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