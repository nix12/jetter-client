import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';
import ability from '../../services/casl/ability';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    username: username,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const logout = () => dispatch => new Promise((resolve, reject) => { 
  const url = '/oauth/revoke';
  
  resolve(
    axios.post(url)
      .then(response => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        ability.update([]);
        
        dispatch(authLogout());
      })
  );
});

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }

    const url = '/oauth/token';

    axios.post(url, authData)
      .then(response => {
        sessionStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', response.data.user.username);
        localStorage.setItem('userId', response.data.user.userId);
        ability.update(response.data.user.rules);

        dispatch(authSuccess(
          response.data.user.userId, 
          response.data.user.username, 
        ));
      })
      .catch(err => {
        console.log(err.response)
        dispatch(authFail(err.response.data.errors));
      })
  }
}
