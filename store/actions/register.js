import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-default';

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  }
}

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  }
}

export const registerFail = (error) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    error: error,
  }
}

export const register = (username, password) => dispatch => new Promise((resolve) => {
  dispatch(registerStart());

  const url = '/api/users';

  const registerData = { 
    user: {
      username: username,
      password: password,
      password_confirmation: password,
    }
  }

  resolve(
    axios.post(url, registerData)
      .then(response => {
        console.log('SUCCESS');
        dispatch(registerSuccess());
      })
      .catch(err => {        
        const errorData = [];
        const error = {};
        
        Object.entries(err.response.data.errors).forEach(([key, value]) => {
          /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
          error[key] = value[0];
          errorData.push(error)
        });

        dispatch(registerFail(errorData[0]));
      })
  )
})
